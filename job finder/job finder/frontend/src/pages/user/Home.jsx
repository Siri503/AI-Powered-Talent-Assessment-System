import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  AiOutlineUserAdd,
  AiOutlineFileText,
  AiOutlineAudio,
  AiOutlineBarChart,
  AiOutlineCheckCircle,
  AiOutlineTeam,
  AiOutlineSchedule,
  AiOutlineStar,
  AiOutlineBulb,
} from "react-icons/ai";
import { BsGraphUp, BsClipboardCheck } from "react-icons/bs";
import { FiAward } from "react-icons/fi";

const Home = () => {
  return (
    <>
      <Header />

      <div className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Hero Section */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-gray-900/90 z-10"></div>
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-business-woman-using-her-digital-tablet-1182-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                TalentPulse AI
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Revolutionizing recruitment with AI-powered candidate assessment,
              mock interviews, and data-driven hiring decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/candidate/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
              >
                <AiOutlineUserAdd className="mr-2" /> Candidate Sign Up
              </a>
              <a
                href="/hr/login"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 border border-white/20 flex items-center justify-center"
              >
                <AiOutlineTeam className="mr-2" /> HR Portal
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
                AI-Powered Hiring Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our end-to-end solution transforms traditional recruitment with
                cutting-edge AI assessment technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <AiOutlineUserAdd className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Candidate Registration
                </h3>
                <p className="text-gray-300 mb-4">
                  Easy sign-up process with resume upload and automatic data
                  extraction
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Resume parsing
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Profile creation
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Skill extraction
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <AiOutlineAudio className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  AI Mock Interview
                </h3>
                <p className="text-gray-300 mb-4">
                  Realistic interview simulation with voice analysis and instant
                  feedback
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Voice response analysis
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Confidence scoring
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Content relevance
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <BsGraphUp className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Performance Analytics
                </h3>
                <p className="text-gray-300 mb-4">
                  Detailed candidate insights with visual data representations
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Skill assessment
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Comparative analysis
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Weakness identification
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <AiOutlineBarChart className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  HR Dashboard
                </h3>
                <p className="text-gray-300 mb-4">
                  Comprehensive interface for reviewing and comparing candidates
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Candidate filtering
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    AI recommendations
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Performance graphs
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <BsClipboardCheck className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Shortlisting System
                </h3>
                <p className="text-gray-300 mb-4">
                  Efficient tools for HR to select top candidates based on
                  multiple criteria
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Score-based ranking
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Bulk actions
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Custom filters
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <AiOutlineSchedule className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Final Interview
                </h3>
                <p className="text-gray-300 mb-4">
                  Seamless transition from AI assessment to human evaluation
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Interview scheduling
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Candidate history
                  </li>
                  <li className="flex items-center text-gray-400">
                    <AiOutlineCheckCircle className="text-indigo-400 mr-2" />
                    Decision tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Flow Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
                Streamlined Hiring Workflow
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our 5-step process ensures you find the best talent efficiently
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-cyan-500 transform -translate-x-1/2"></div>

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <div className="inline-block bg-indigo-900/50 p-3 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Registration & Resume Upload
                  </h3>
                  <p className="text-gray-300">
                    Candidates create profiles and upload resumes which our
                    system automatically parses to extract key information.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-16 flex justify-center">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-md">
                    <AiOutlineFileText className="text-5xl text-indigo-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Smart Resume Parsing
                    </h4>
                    <p className="text-gray-300">
                      Extracts skills, experience, education and more with 95%
                      accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 order-2 md:order-1">
                  <div className="inline-block bg-indigo-900/50 p-3 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    AI Mock Interview
                  </h3>
                  <p className="text-gray-300">
                    Our AI conducts realistic interviews, analyzing verbal
                    responses for content, confidence, and communication skills.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-16 flex justify-center order-1 md:order-2">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-md">
                    <AiOutlineAudio className="text-5xl text-indigo-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Voice Analysis
                    </h4>
                    <p className="text-gray-300">
                      Evaluates speech patterns, fluency, and confidence levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <div className="inline-block bg-indigo-900/50 p-3 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    HR Candidate Review
                  </h3>
                  <p className="text-gray-300">
                    HR professionals access comprehensive candidate profiles
                    with AI-generated insights and visual performance metrics.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-16 flex justify-center">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-md">
                    <AiOutlineBarChart className="text-5xl text-indigo-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Performance Dashboard
                    </h4>
                    <p className="text-gray-300">
                      Interactive charts showing candidate strengths and
                      weaknesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 order-2 md:order-1">
                  <div className="inline-block bg-indigo-900/50 p-3 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Shortlisting Candidates
                  </h3>
                  <p className="text-gray-300">
                    HR can efficiently filter and compare candidates based on
                    multiple criteria with AI recommendations.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-16 flex justify-center order-1 md:order-2">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-md">
                    <AiOutlineStar className="text-5xl text-indigo-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Smart Shortlisting
                    </h4>
                    <p className="text-gray-300">
                      AI highlights top candidates based on job requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <div className="inline-block bg-indigo-900/50 p-3 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">5</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Final Interview & Decision
                  </h3>
                  <p className="text-gray-300">
                    Conduct live interviews with shortlisted candidates and make
                    final hiring decisions with all data at your fingertips.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-16 flex justify-center">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-md">
                    <FiAward className="text-5xl text-indigo-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Hiring Decision
                    </h4>
                    <p className="text-gray-300">
                      Track and manage candidates through the final stages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
                <h3 className="text-5xl font-bold text-white mb-2">98%</h3>
                <p className="text-indigo-100 text-lg">
                  Resume Parsing Accuracy
                </p>
              </div>
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
                <h3 className="text-5xl font-bold text-white mb-2">70%</h3>
                <p className="text-indigo-100 text-lg">
                  Reduction in Screening Time
                </p>
              </div>
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
                <h3 className="text-5xl font-bold text-white mb-2">4.8/5</h3>
                <p className="text-indigo-100 text-lg">
                  Candidate Satisfaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AiOutlineBulb className="text-5xl text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              TalentPulse AI helps you find the best candidates faster while
              providing applicants with a modern, engaging experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/demo"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
              >
                Request Demo
              </a>
              <a
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 border border-white/20"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
