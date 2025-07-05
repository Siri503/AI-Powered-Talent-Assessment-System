import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (email === "hr@gmail.com" && password === "hr123" && role === "hr") {
      localStorage.setItem("role", "hr");
      navigate("/post");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/student/login", {
        email,
        password,
      });
      localStorage.setItem("role", "Student");
      localStorage.setItem("user", JSON.stringify(data?.student));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Decorative */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-500 p-8 text-white">
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to CareerConnect
              </h1>
              <p className="text-lg mb-8">
                Sign in to find your dream job or discover top talent for your
                organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <FaUserTie className="text-xl" />
                  </div>
                  <span>For Job Seekers: Find your perfect role</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <FaBriefcase className="text-xl" />
                  </div>
                  <span>For HR: Discover and hire top talent</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <FaLock className="text-xl" />
                  </div>
                  <span>Secure platform with encrypted data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Login to Your Account
            </h2>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserShield className="text-gray-400" />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="hr">HR </option>
                  <option value="user">Job Seeker</option>
                </select>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center"
                disabled={loading}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Register as Job Seeker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
