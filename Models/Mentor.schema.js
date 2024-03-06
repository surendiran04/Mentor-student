const mongoose = require('mongoose')

const mentorSChema = new mongoose.Schema({
    MentorId: {
        type: String,
        required: true,
        unique: true,
    },
    MentorName: {
        type: String,
        required: true,
    },
    studentsAssigned: [
        {
            studentId: Number,
            studentName: String,
        },
    ],
});

const mentorModel=mongoose.model('Mentor',mentorSChema);

module.exports = mentorModel;

