import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaStop,
  FaPlay,
  FaSave,
  FaSpinner,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";

const TestPage = () => {
  const desc = localStorage.getItem("desc");
  const user = JSON.parse(localStorage.getItem("user"));
  const userResume = user?.resumeSummary;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [audioURLs, setAudioURLs] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/interview/questions",
        {
          job_description:
            desc || "A full stack MERN developer with good exp in it",
          num_questions: 10,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      setQuestions(data.questions);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const startRecording = (questionId) => {
    setActiveQuestion(questionId);
    audioChunks.current = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.start();
        setRecording(true);

        mediaRecorder.current.ondataavailable = (e) => {
          audioChunks.current.push(e.data);
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURLs((prev) => ({ ...prev, [questionId]: audioUrl }));
        };
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
      setActiveQuestion(null);
    }
  };

  const evaluateResponse = async (questionId, questionText) => {
    if (!audioURLs[questionId]) return;

    setIsEvaluating(true);
    try {
      // 1. First evaluate the response (existing code)
      const audioBlob = await fetch(audioURLs[questionId]).then((r) =>
        r.blob()
      );
      const formData = new FormData();
      formData.append("question", questionText);
      formData.append("audio_file", audioBlob, "response.wav");

      const evaluationResponse = await axios.post(
        "http://127.0.0.1:8000/evaluate-interview-response/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const evaluationData = evaluationResponse.data;
      setEvaluations((prev) => ({
        ...prev,
        [questionId]:
          evaluationData.score ||
          evaluationData.feedback ||
          "Evaluation completed",
      }));

      // 2. Now save to your backend
      const user = JSON.parse(localStorage.getItem("user"));
      const jobId = localStorage.getItem("jobId"); // You'll need to store this when the user selects a job

      if (!user || !jobId) {
        throw new Error("User or Job ID not found");
      }

      // Check if interview exists for this user and job
      const interviewCheck = await axios.post(
        `http://localhost:5000/interview/createInterview`,
        {
          student: user._id,
          job: jobId,
        }
      );

      let interviewId;
      console.log(interviewCheck?.data?.interview?._id);

      if (interviewCheck.data.length === 0) {
        // Create new interview if it doesn't exist
        const interview = await axios.post(
          "http://localhost:5000/interview/createInterview",
          {
            student: user._id,
            job: jobId,
          }
        );

        interviewId = interview.data?.interview?._id;
      } else {
        interviewId = interviewCheck?.data?.interview?._id;
      }

      // Prepare response data for your backend
      const responseData = {
        question: evaluationData.question,
        transcription: evaluationData.transcription,
        evaluation: evaluationData.evaluation,
        relevance_score: evaluationData.relevance_score.toString(),
        clarity_score: evaluationData.clarity_score.toString(),
        confidence_score: evaluationData.confidence_score.toString(),
        overall_score: evaluationData.overall_score.toString(),
      };

      // Add response to the interview
      await axios.post(`http://localhost:5000/interview/addResponse`, {
        responses: [responseData],
        interviewId,
      });
    } catch (error) {
      console.error("Error in evaluation or saving:", error);
      setEvaluations((prev) => ({
        ...prev,
        [questionId]: "Error in evaluation or saving",
      }));
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    getQuestions();
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stream
          ?.getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Mock Interview
        </h1>
        <p className="text-gray-600 mb-8">
          Practice your responses to these interview questions tailored for your
          job application.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {q.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {index + 1}. {q.question}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {!audioURLs[index] ? (
                    <button
                      onClick={() => startRecording(index)}
                      disabled={recording}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        recording
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <FaMicrophone className="mr-2" />
                      {recording && activeQuestion === index
                        ? "Recording..."
                        : "Record Answer"}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          const audio = new Audio(audioURLs[index]);
                          audio.play();
                        }}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        <FaPlay className="mr-2" />
                        Playback
                      </button>
                      <button
                        onClick={() => evaluateResponse(index, q.question)}
                        disabled={isEvaluating}
                        className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:bg-purple-300"
                      >
                        {isEvaluating ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Evaluating...
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-2" />
                            Submit for Evaluation
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAudioURLs((prev) => {
                            const newUrls = { ...prev };
                            delete newUrls[index];
                            return newUrls;
                          });
                          setEvaluations((prev) => {
                            const newEvals = { ...prev };
                            delete newEvals[index];
                            return newEvals;
                          });
                        }}
                        className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                      >
                        <IoMdRefresh className="mr-2" />
                        Retry
                      </button>
                    </>
                  )}

                  {recording && activeQuestion === index && (
                    <button
                      onClick={stopRecording}
                      className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      <FaStop className="mr-2" />
                      Stop Recording
                    </button>
                  )}
                </div>

                {evaluations[index] && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-1">
                      Evaluation:
                    </h4>
                    <p className="text-blue-700">{evaluations[index]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No questions generated yet</p>
            <button
              onClick={getQuestions}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Questions
            </button>
          </div>
        )}
      </div>
      {questions.length != 0 ? (
        <div className="w-full flex justify-center items-center">
          <Link
            to="/allJobs"
            className="px-4 py-2 mt-[50px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            End test
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default TestPage;
