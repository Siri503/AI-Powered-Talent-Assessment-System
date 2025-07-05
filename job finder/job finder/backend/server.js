const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const student = require("./routes/studentRoutes");
const job = require("./routes/jobRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const connectDB = require("./config/db");

connectDB();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/student", student);
app.use("/job", job);
app.use("/interview", interviewRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
