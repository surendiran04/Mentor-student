const express = require('express')
const router= express.Router()
const { createMentor,AssignStudent, getStudentsbyMentor } = require("../Controllers/Mentor.js")
const { createStudents, changeStudentMentor, getStudents,getpreviousMentors } = require('../Controllers/Student.js')

router.put("/assignstudent",AssignStudent)
router.post("/creatementor",createMentor)
router.get("/:id/assignedstudents", getStudentsbyMentor);
router.get("/",getStudents)
router.get("/:id/previousmentors",getpreviousMentors);
router.post("/createstudent",createStudents)
router.put("/changestudentmentor/:Id",changeStudentMentor);

module.exports = router ;