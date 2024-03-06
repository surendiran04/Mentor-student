const express=require('express');
const app=express();
require('dotenv').config();
const {setUpDBConnection} = require("./Database/DBconfig.js")
const router = require('./Routes/routes.js');

setUpDBConnection();
(process.env.NODE_ENV == "development")?console.log("development environment"):console.log("production environment");

const PORT = (process.env.NODE_ENV == "development")?process.env.NODE_DEV_PORT:process.env.NODE_PROD_PORT; 
app.use(express.json());
app.use(router)
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})