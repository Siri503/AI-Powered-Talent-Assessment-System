import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiType,
  FiUser,
  FiX,
  FiClock,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import {
  FaBuilding,
  FaRegListAlt,
  FaCode,
  FaRegBuilding,
} from "react-icons/fa";
import axios from "axios";

const CreateJob = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    experience: "",
    skillsRequired: [],
    CTC: "",
    location: "",
    jobType: "",
    currentSkill: "",
    desc: "",
  });

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (
      formData.currentSkill.trim() &&
      !formData.skillsRequired.includes(formData.currentSkill.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, prev.currentSkill.trim()],
        currentSkill: "",
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/job/create", {
        jobData: formData,
      });

      if (data) {
        alert("Job posted successfully!");
        setIsModalOpen(false);
        setFormData({
          role: "",
          company: "",
          experience: "",
          skillsRequired: [],
          CTC: "",
          location: "",
          jobType: "",
          currentSkill: "",
          desc: "",
        });
        getAllJobs();
      } else {
        throw new Error(data.message || "Failed to post job");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDel = async (jobId) => {
    try {
      await axios.post("http://localhost:5000/job/delete", {
        jobId,
      });
      getAllJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/job/all");
      setAllJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 h-screen overflow-auto">
        <div className="w-full">
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold text-indigo-400 mb-2">
              Manage Job Postings
            </h1>
            <p className="text-gray-400 mb-6">
              Create and manage all your company's job listings in one place
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            >
              <FiBriefcase className="mr-2" />
              Post a New Job
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-300 mb-6 flex items-center">
              <FaCode className="mr-2 text-indigo-400" />
              Current Job Openings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {job.role}
                        </h3>
                        <div className="flex items-center mt-1 text-indigo-300">
                          <FaRegBuilding className="mr-1" />
                          <span>{job.company}</span>
                        </div>
                      </div>
                      <span className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skillsRequired.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-700 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-400">
                        <FiDollarSign className="mr-2 text-purple-400" />
                        <span>${job.CTC}K/year</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <FiClock className="mr-2 text-blue-400" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <FiMapPin className="mr-2 text-green-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="text-xs">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400 mt-5">
                      <span className="text-sm font-bold ">
                        JD: {job?.desc}
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-indigo-400">
                          {job.appliedCandidates.length}
                        </span>{" "}
                        applicants
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDel(job._id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-800/50 p-8 rounded-xl border border-dashed border-gray-700">
                  <FiBriefcase className="mx-auto text-4xl text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-gray-400">
                    No jobs posted yet
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Click the button above to post your first job opening
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <FiBriefcase className="mr-2" />
                  Post a New Job
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FiUser className="mr-2 text-indigo-400" />
                      Job Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FaBuilding className="mr-2 text-indigo-400" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FiUser className="mr-2 text-indigo-400" />
                      Experience Required
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="e.g., 2-4 years"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FiDollarSign className="mr-2 text-indigo-400" />
                      CTC (Salary)
                    </label>
                    <input
                      type="text"
                      name="CTC"
                      value={formData.CTC}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FiMapPin className="mr-2 text-indigo-400" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="e.g., New York, NY"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FiType className="mr-2 text-indigo-400" />
                      Job Type
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                    >
                      <option value="">Select job type</option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <FiMapPin className="mr-2 text-indigo-400" />
                    Job Description
                  </label>
                  <input
                    type="text"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                    placeholder="Enter the job description"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <FaRegListAlt className="mr-2 text-indigo-400" />
                    Required Skills
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={formData.currentSkill}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentSkill: e.target.value,
                        }))
                      }
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
                      placeholder="Add a skill"
                    />
                    <button
                      type="button"
                      onClick={handleSkillAdd}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skillsRequired.map((skill) => (
                      <div
                        key={skill}
                        className="bg-gray-700 text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateJob;
