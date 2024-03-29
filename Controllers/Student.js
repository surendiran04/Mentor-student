const StudentsModel = require('../Models/Student.schema.js')
const createStudents = async (req, res) => {
    try {
      let newStudent = await StudentsModel(req.body);
      let existingStudent = await StudentsModel.findOne({ StudentId: req.body.StudentId }); 
      if(existingStudent) {
        res.status(400).send({ message: "Student Data Already exists", Student });
        }
        else{
        res
        .status(200)
          .send({ message: "Student Data Created Successfully", newStudent });
          await newStudent.save();
        }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  };
  
  const getStudents = async (req, res) => {
    try {
      let students = await StudentsModel.find({});
      if (students.length)
        res.status(200).send({ message: "Students datas are fetched", students });
      else res.status(400).send({ message: "Stundents Data Not Created" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  };
  
  const changeStudentMentor = async (req, res) => {
    try {
      const newMentorId = req.body.newMentorId;
      const newMentorName = req.body.newMentorName;
  
      const student = await StudentsModel.findOne({ StudentId: req.params.Id });
  
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      student.MentorHistory.MentorId= student.MentorAssigned.MentorId,
      student.MentorHistory.MentorName=student.MentorAssigned.MentorName,
      student.MentorHistory.AssignedAt=new Date()
  
        student.MentorAssigned = {
          MentorId: newMentorId,
          MentorName: newMentorName,
        };
    
        await student.save();
      res
        .status(200)
        .send({ message: "Mentor changed for student successfully", student });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  };
  
  const getpreviousMentors = async (req, res) => {
      try {
        const student = await StudentsModel.findOne({ StudentId: req.params.Id});
    
        if (!student) {
          return res.status(404).send({ message: "Student not found" });
        }
    
        const mentorHistory = student.MentorHistory;
    
        res.status(200).send({ message: "Previous mentors retrieved successfully", mentorHistory });
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
      }
    };
  
    module.exports = {
    createStudents,
    changeStudentMentor,
    getStudents,
    getpreviousMentors
  };