const mentorModel = require('../Models/Mentor.schema.js')

const createMentor=async(req,res)=>{

    try {
        const existingMentor = await mentorModel.findOne({ MentorId: req.body.MentorId });
        let newMentor = await mentorModel(req.body);
        if(existingMentor) {
            res.status(400).send({message:"Mentor data already exists"})
        //   const newMentor = new mentorModel({
        //     MentorId: req.body.MentorId,
        //     MentorName: req.body.MentorName,
        //     studentsAssigned:[],
        //   });
          
        }
        else
        await newMentor.save();
            res.status(200).send({message:"Mentors Data Created Successfully",
            newMentor})
       
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}

const AssignStudent= async(req,res)=>{
    try {
        const mentor = await mentorModel.findOne({ MentorId: req.body.MentorId });
        if (!mentor) {
          return res.status(404).send({ message: "Mentor not found" });
        }
        const existingStudent = mentor.studentsAssigned.find(student => student.studentId === req.body.StudentId);
        if (existingStudent) {
            return res.status(400).send({ message: "Student already assigned to this mentor" });
        }
        const newStudents = req.body.studentsAssigned;   //                                
        newStudents.forEach((i)=>{
            mentor.studentsAssigned.push(i);

        })
           
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