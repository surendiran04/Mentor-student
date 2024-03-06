const mongoose = require('mongoose')

const studentSChema = new mongoose.Schema({
   StudentId:{
    type:Number,
    requires:true,
    unique:true
   }, StudentName: {
    type: String,
    required: true,
},
MentorAssigned: {
    MentorId: {type:Number},
    MentorName: {type:String },
},
MentorHistory: {
    MentorId: Number,
    MentorName: String,
    AssignedAt: { type: Date, default: Date.now }
},
});

const studentModel=mongoose.model('students',studentSChema);

module.exports = studentModel;