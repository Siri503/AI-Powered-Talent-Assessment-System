const Job = require("../models/jobModel");

// Create Job and Add to HR
const createJob = async (req, res) => {
  try {
    const { jobData } = req.body; // Extract HR ID from request body

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job and Remove from HR's Jobs Array
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.body.jobId, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Job
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.body.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Selected Students
const addSelectedStudents = async (req, res) => {
  try {
    const { jobId, studentIds } = req.body;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.selectedCandidates.push(...studentIds);
    await job.save();

    res
      .status(200)
      .json({ message: "Selected students added successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  addSelectedStudents,
};
