import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import {
  FaEye,
  FaUserTie,
  FaBuilding,
  FaCalendarAlt,
  FaStar,
  FaRegStar,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getALLInterviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/interview/");
      setInterviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getALLInterviews();
  }, []);

  const openModal = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const sendEmail = (student) => {
    const subject = "Congratulations!";
    const body = `Dear ${student.name},\n\nCongratulations! You have cleared the 1st round of interviews. Now you are proceeding to the second round.\n\nHere is the interview link: [Paste Google Meet link here]\n\nBest regards,\n[Your Name]`;

    window.open(
      `mailto:${student.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  const renderStars = (score) => {
    const stars = [];
    const filledStars = Math.round(score * 5);
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-500 inline" />);
      }
    }
    return stars;
  };

  const prepareChartData = (responses) => {
    return responses.map((response, index) => ({
      name: `Q${index + 1}`,
      relevance: response.relevance_score * 100,
      clarity: response.clarity_score * 100,
      confidence: response.confidence_score * 100,
      overall: response.overall_score * 100,
    }));
  };

  const prepareRadarData = (responses) => {
    const categories = [
      "Relevance",
      "Clarity",
      "Confidence",
      "Depth",
      "Technical Accuracy",
    ];
    return [
      {
        subject: "Performance",
        ...categories.reduce((acc, category, index) => {
          const response = responses[index % responses.length];
          let value = 0;
          if (category === "Relevance") value = response.relevance_score * 100;
          else if (category === "Clarity") value = response.clarity_score * 100;
          else if (category === "Confidence")
            value = response.confidence_score * 100;
          else if (category === "Depth")
            value = (response.relevance_score + response.clarity_score) * 50;
          else value = (response.overall_score * 100) / 1.5;
          return { ...acc, [category]: value };
        }, {}),
      },
    ];
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Interview Records
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-600 rounded-full p-3 mr-4">
                    <FaUserTie className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {interview.student.name}
                    </h2>
                    <p className="text-gray-400">{interview.student.email}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <FaBuilding className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{interview.job.company}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-400">Position</p>
                    <p className="text-white">{interview.job.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">CTC</p>
                    <p className="text-white">{interview.job.CTC} LPA</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => openModal(interview)}
                    className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaEye className="mr-2" /> View Details
                  </button>
                  <button
                    onClick={() => sendEmail(interview.student)}
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaEnvelope className="mr-2" /> Send Mail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedInterview && (
        <div className="fixed inset-0 backdrop-blur-sm p-4 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedInterview.student.name}'s Interview
                  </h2>
                  <p className="text-gray-400">
                    {selectedInterview.job.role} at{" "}
                    {selectedInterview.job.company}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => sendEmail(selectedInterview.student)}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaEnvelope className="mr-2" /> Send Mail
                  </button>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-gray-600 pb-2">
                    Student Info
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    {selectedInterview.student.email}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Resume:</span>
                    <a
                      href={selectedInterview.student.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 ml-2 inline-flex items-center"
                    >
                      View Resume <FiExternalLink className="ml-1" />
                    </a>
                  </p>
                  <div className="mt-3">
                    <h4 className="font-medium text-white mb-1">
                      Resume Summary:
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {selectedInterview.student.resumeSummary}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-gray-600 pb-2">
                    Job Details
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Company:</span>{" "}
                    {selectedInterview.job.company}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Role:</span>{" "}
                    {selectedInterview.job.role}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Location:</span>{" "}
                    {selectedInterview.job.location}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Experience:</span>{" "}
                    {selectedInterview.job.experience}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Job Type:</span>{" "}
                    {selectedInterview.job.jobType}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Skills Required:</span>{" "}
                    {selectedInterview.job.skillsRequired.join(", ")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">
                    Performance Metrics
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareChartData(selectedInterview.responses)}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="name" stroke="#D1D5DB" />
                        <YAxis stroke="#D1D5DB" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#374151",
                            borderColor: "#4B5563",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="relevance"
                          fill="#8B5CF6"
                          name="Relevance (%)"
                        />
                        <Bar
                          dataKey="clarity"
                          fill="#10B981"
                          name="Clarity (%)"
                        />
                        <Bar
                          dataKey="confidence"
                          fill="#3B82F6"
                          name="Confidence (%)"
                        />
                        <Bar
                          dataKey="overall"
                          fill="#F59E0B"
                          name="Overall (%)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">
                    Skills Radar Chart
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={prepareRadarData(selectedInterview.responses)}
                      >
                        <PolarGrid stroke="#4B5563" />
                        <PolarAngleAxis dataKey="subject" stroke="#D1D5DB" />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          stroke="#D1D5DB"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#374151",
                            borderColor: "#4B5563",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Radar
                          name="Performance"
                          dataKey="Performance"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div> */}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
                Interview Responses
              </h3>

              <div className="space-y-6">
                {selectedInterview.responses.map((response, index) => (
                  <div
                    key={response._id}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-medium text-white">
                        Question {index + 1}: {response.question}
                      </h4>
                      <div className="bg-gray-600 px-3 py-1 rounded-full text-sm">
                        <span className="font-medium text-white">
                          Overall:{" "}
                        </span>
                        {renderStars(response.overall_score)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 mb-2">
                        <span className="font-medium">Response:</span> "
                        {response.transcription}"
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                        <div className="bg-gray-800 p-2 rounded">
                          <span className="font-medium text-gray-400">
                            Relevance:
                          </span>{" "}
                          {(response.relevance_score * 100).toFixed(0)}%
                        </div>
                        <div className="bg-gray-800 p-2 rounded">
                          <span className="font-medium text-gray-400">
                            Clarity:
                          </span>{" "}
                          {(response.clarity_score * 100).toFixed(0)}%
                        </div>
                        <div className="bg-gray-800 p-2 rounded">
                          <span className="font-medium text-gray-400">
                            Confidence:
                          </span>{" "}
                          {(response.confidence_score * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-900 bg-opacity-30 p-3 rounded-lg">
                        <h5 className="font-medium text-green-400 mb-2">
                          Strengths
                        </h5>
                        <ul className="list-disc list-inside text-green-300 text-sm space-y-1">
                          {response.evaluation.strengths.length > 0 ? (
                            response.evaluation.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))
                          ) : (
                            <li>No notable strengths identified</li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-red-900 bg-opacity-30 p-3 rounded-lg">
                        <h5 className="font-medium text-red-400 mb-2">
                          Areas for Improvement
                        </h5>
                        <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                          {response.evaluation.improvements.map(
                            (improvement, i) => (
                              <li key={i}>{improvement}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;
