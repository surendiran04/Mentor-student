const mongoose = require('mongoose');
require('dotenv').config();

function setUpDBConnection(){
    return mongoose
    .connect(`${process.env.DB_URL}`)///StudentMentor
    .then((res)=>{
        console.log('Database connected successfully')
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports ={setUpDBConnection};

