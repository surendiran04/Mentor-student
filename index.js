const express=require('express');
const app=express();
require('dotenv').config();


(process.env.NODE_ENV == "development")?console.log("development environment"):console.log("production environment");

const PORT = (process.env.NODE_ENV == "development")?process.env.NODE_DEV_PORT:process.env.NODE_PROD_PORT; 

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})