const express = require("express");
const {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  addSelectedStudents,
} = require("../controllers/jobControllers");

const router = express.Router();

router.post("/create", createJob);
router.post("/delete", deleteJob);
router.post("/update", updateJob);
router.get("/all", getAllJobs);
router.post("/single", getSingleJob);
router.post("/add-selected", addSelectedStudents);

module.exports = router;
