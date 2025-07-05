const Student = require("../models/studentModel");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, resumeUrl, resumeSummary } = req.body;

    const student = new Student({
      name,
      email,
      password,
      resumeUrl,
      resumeSummary,
    });
    await student.save();
    res.status(201).json({ message: "Registration successful", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "User not found" });

    res.json({ message: "Login successful", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add Details
exports.addDetails = async (req, res) => {
  try {
    const { phone, address, education, skills } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.body.id,
      { phone, address, education, skills },
      { new: true }
    );
    res.json({ message: "Details updated", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload Resume
exports.addCV = async (req, res) => {
  try {
    const { id, resumeUrl, resumeSummary } = req.body;
    const student = await Student.findByIdAndUpdate(
      id,
      { resumeUrl },
      { resumeSummary },
      { new: true }
    );
    res.json({ message: "Resume uploaded", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Student
exports.getSingleStudent = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
