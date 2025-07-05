const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  responses: [
    {
      question: {
        type: String,
      },
      transcription: {
        type: String,
      },
      evaluation: {
        strengths: [
          {
            type: String,
          },
        ],
        improvements: [
          {
            type: String,
          },
        ],
      },
      relevance_score: {
        type: String,
      },
      clarity_score: {
        type: String,
      },
      confidence_score: {
        type: String,
      },
      overall_score: {
        type: String,
      },
    },
  ],
});

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
