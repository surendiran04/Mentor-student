const express = require('express')
const router= express.Router()
const { createMentor,AssignStudent, getStudentsbyMentor } = require("../Controllers/Mentor.js")
const { createStudents, changeStudentMentor, getStudents,getpreviousMentors } = require('../Controllers/Student.js')

router.put("/assignstudent",AssignStudent)
router.post("/creatementor",createMentor)
router.get("/assignedstudents/:Id", getStudentsbyMentor);
router.get("/",getStudents)
router.get("/previousmentors/:Id",getpreviousMentors);
router.post("/createstudent",createStudents)
router.put("/changestudentmentor/:Id",changeStudentMentor);

module.exports = router ;