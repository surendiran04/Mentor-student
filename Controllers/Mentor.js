const mentorModel = require('../Models/Mentor.schema.js')

const createMentor=async(req,res)=>{

    try {
        const Mentor = await mentorModel.findOne({ MentorId: req.body.MentorId });
    
        if (!Mentor) {
          const newMentor = new mentorModel({
            MentorId: req.body.MentorId,
            MentorName: req.body.MentorName,
            studentsAssigned:[],
          });
          await newMentor.save();
            res.status(200).send({message:"Mentors Data Created Successfully",
            newMentor})
        }
        else
        res.status(400).send({message:"Mentor data already exists"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}

const AssignStudent= async(req,res)=>{
    try {
        const mentor = await mentorModel.findOne({ MentorId: req.body.MentorId, MentorName: req.body.MentorName });
        if (!mentor) {
          return res.status(404).send({ message: "Mentor not found" });
        }
        const existingStudent = mentor.studentsAssigned.find(student => student.studentId === req.body.StudentId);
        if (existingStudent) {
            return res.status(400).send({ message: "Student already assigned to this mentor" });
        }
        const newStudent = {
            studentId: req.body.StudentId,
            studentName: req.body.StudentName
        };

        mentor.studentsAssigned.push(newStudent);
        await mentor.save();
        res.status(200).send({message:"Student assigned to this mentor Successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}

const getStudentsbyMentor = async (req, res) => {
    try {
      const mentor = await mentorModel.findOne({ MentorId: req.params.id });
      if (!mentor) {
        return res.status(404).send({ message: "Mentor not found" });
      }
      res.status(200).send({
        message: "Students assigned to this mentor are",
        AssignedStudents: mentor.studentsAssigned,
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
  };

module.exports = {
    createMentor,
    AssignStudent,
    getStudentsbyMentor
}