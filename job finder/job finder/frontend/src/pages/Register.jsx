import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaFileAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    education: "",
    skills: "",
    resumeUrl: "",
    resumeSummary: null,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setError("");
    } else {
      setError("Please upload a PDF file");
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setError("Please select a resume file");
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      // 1. Upload to your API for parsing
      const parseResponse = await axios.post(
        "http://127.0.0.1:8000/api/resume/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 2. Upload to Cloudinary (RAW for PDFs)
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", resumeFile);
      cloudinaryFormData.append("upload_preset", "hg73yvrn");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/didyxuyd5/raw/upload",
        cloudinaryFormData
      );

      // 3. Auto-download the uploaded PDF
      const pdfUrl = cloudinaryResponse.data.secure_url;

      setIsUploading(false);
      console.log(parseResponse?.data?.summary?.summary);

      return {
        resumeUrl: pdfUrl,
        resumeSummary: parseResponse?.data?.summary?.summary,
      };
    } catch (err) {
      setIsUploading(false);
      setError("Failed to process resume. Please try again.");
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // First upload and parse the resume
    const resumeData = await uploadResume();
    if (!resumeData) {
      setLoading(false);
      return;
    }

    // Prepare the data to send to backend
    const userData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      resumeUrl: resumeData.resumeUrl,
      resumeSummary: resumeData.resumeSummary,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/student/register",
        userData
      );
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Decorative (hidden on mobile) */}
          <div className="hidden md:block md:w-1/3 bg-gradient-to-b from-blue-600 to-indigo-500 p-8 text-white">
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">Find Your Dream Job</h1>
              <p className="text-lg mb-6">
                Join our platform to connect with top employers and showcase
                your skills.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <FaUser className="text-xl" />
                  </div>
                  <span>Create your professional profile</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <MdWork className="text-xl" />
                  </div>
                  <span>Apply to top companies</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <FaFileAlt className="text-xl" />
                  </div>
                  <span>Upload your resume for employers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Job Seeker Registration
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Education */}
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGraduationCap className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text"
                    name="education"
                    placeholder="Education (e.g., B.Tech Computer Science)"
                    value={formData.education}
                    onChange={handleChange}
                  />
                </div>

                {/* Skills */}
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdWork className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated, e.g., JavaScript, React, Node.js)"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                {/* Resume Upload */}
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume (Word only)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
                      <FaCloudUploadAlt className="mr-2" />
                      Choose File
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="ml-2 text-sm text-gray-500">
                      {resumeFile ? resumeFile.name : "No file chosen"}
                    </span>
                  </div>
                  {isUploading && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 flex items-center justify-center"
                disabled={loading || isUploading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
