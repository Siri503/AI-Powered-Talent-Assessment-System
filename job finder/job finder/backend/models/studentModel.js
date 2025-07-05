const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    education: { type: String },
    skills: { type: [String] },
    resumeUrl: { type: String },
    resumeSummary: { type: String },
    messages: [
      {
        type: String,
      },
    ],
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
