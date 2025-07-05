const express = require("express");
const router = express.Router();
const {
  createInterview,
  addInterviewResponses,
  getAllInterviews,
  getSingleInterview,
} = require("../controllers/interviewController");

// Create a new interview (student + job)
router.post("/createInterview", createInterview);

// Add responses to a specific interview
router.post("/addResponse", addInterviewResponses);

// Get all interviews
router.get("/", getAllInterviews);

// Get single interview by ID
router.post("/singleInterview", getSingleInterview);

module.exports = router;
