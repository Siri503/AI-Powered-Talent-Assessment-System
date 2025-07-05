const Interview = require("../models/interviewModel");
const Student = require("../models/studentModel");

// Create a new interview with student and job
const createInterview = async (req, res) => {
  try {
    const { student, job } = req.body;

    // Check if interview already exists
    const existingInterview = await Interview.findOne({ student, job });
    if (existingInterview) {
      return res.status(200).json({
        message: "Interview already exists for this student and job",
        interview: existingInterview,
      });
    }

    const newInterview = new Interview({
      student,
      job,
      responses: [],
    });

    const savedInterview = await newInterview.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add responses to an existing interview
const addInterviewResponses = async (req, res) => {
  try {
    const { responses, interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    interview.responses.push(...responses);
    const updatedInterview = await interview.save();

    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all interviews
const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("student")
      .populate("job");
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single interview by ID
const getSingleInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId)
      .populate("student")
      .populate("job");

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInterview,
  addInterviewResponses,
  getAllInterviews,
  getSingleInterview,
};
