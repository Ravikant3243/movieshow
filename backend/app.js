import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRouter from "./routes/user-routes.js";
 
// dotenv.config();
 

const app = express();

 app.use("/",(req,res,next)=>{
    console.log("server started");
    res.send("hi");
 })
app.listen(5000, () => {
         console.log("app is running");
        
     });