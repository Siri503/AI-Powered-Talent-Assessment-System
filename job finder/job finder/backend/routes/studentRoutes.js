const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.post("/addDetails", studentController.addDetails);
router.post("/addCV", studentController.addCV);
router.post("/getSingleStudent", studentController.getSingleStudent);
router.post("/getAllStudents", studentController.getAllStudents);

module.exports = router;
