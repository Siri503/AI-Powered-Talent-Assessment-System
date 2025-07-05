import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaStar,
  FaPercentage,
} from "react-icons/fa";
import { MdDescription, MdWork } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userResume = user?.resumeSummary;
  console.log(userResume);

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/job/all");
      setAllJobs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const checkJobMatch = async (job) => {
    setSelectedJob(job);
    try {
      // Prepare the data as JSON
      const requestData = {
        resume_summary: userResume,
        job_description:
          job.desc ||
          `${job.role} at ${job.company} requiring ${job.skillsRequired.join(
            ", "
          )}`,
      };

      // Send as application/json
      const response = await axios.post(
        "http://127.0.0.1:8000/api/job/match",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      setMatchResult(response.data);
      setShowMatchModal(true);
    } catch (error) {
      console.log(error);
      // You might want to show an error to the user here
    }
  };

  const takeTest = async (job) => {
    try {
      localStorage.setItem("desc", job?.desc);
      localStorage.setItem("jobId", job?._id);
      navigate("/test");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-[50px]">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Available Job Opportunities
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {job.role}
                      </h2>
                      <p className="text-gray-600 mt-1 flex items-center">
                        <FaBuilding className="mr-2 text-blue-500" />
                        {job.company}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.jobType === "Full-time"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {job.jobType}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave className="mr-2 text-blue-500" />
                      <span>₹{job.CTC} LPA</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-blue-500" />
                      <span>{job.experience} experience</span>
                    </div>
                    {job.desc && (
                      <div className="flex items-start text-gray-600">
                        <MdDescription className="mr-2 mt-1 text-blue-500" />
                        <p className="text-sm line-clamp-2">{job.desc}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Skills Required:
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => checkJobMatch(job)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      <FaStar className="mr-2" />
                      Check Match
                    </button>
                    <button
                      onClick={() => takeTest(job)}
                      className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
                    >
                      Take test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match Result Modal */}
        {showMatchModal && (
          <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowMatchModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <IoClose className="text-2xl" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Job Match Result
              </h2>
              <p className="text-gray-600 mb-6">
                How well your resume matches with {selectedJob?.role} at{" "}
                {selectedJob?.company}
              </p>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="8"
                      strokeDasharray={`${
                        matchResult?.match_percentage || 0
                      } 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold text-gray-800">
                      {matchResult?.match_percentage || 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FaPercentage className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Recommendation
                    </h3>
                    <p className="text-gray-600">
                      {matchResult?.recommendation ||
                        "No recommendation available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Apply Anyway
                </button>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllJobs;
