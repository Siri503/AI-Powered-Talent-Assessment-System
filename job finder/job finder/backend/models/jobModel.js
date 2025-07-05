const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    CTC: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    appliedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    selectedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
