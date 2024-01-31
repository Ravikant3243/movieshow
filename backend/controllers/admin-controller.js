import Admin from "../models/Admin.js";
import  bcrypt  from "bcryptjs";
 import dotenv from "dotenv";
 
import jwt from "jsonwebtoken"
dotenv.config();
  export const getAllAdmins= async(req,res,next)=>{
           let admins;
           admins=await Admin.find();
            try {
                 console.log(admins);
            } catch (error) {
                 console.log(error);
            }
             if(!admins){
                 return   res.status(400).json({"message":"some error occured"})
             }
              return res.status(200).json(admins);
  }
   export const addAdmin=async(req,res,next)=>{
         const {email,password}=req.body;
          if(!email || email.trim()==="" || !password || password.trim()===""){
                 return res.status(404).json({"message":"Invalid admin credentials"});
          }
                     let existingAdmin;
                      try {
                         existingAdmin=await Admin.findOne({email});
                      } catch (error) {
                          console.los(error);
                      }
                       if(existingAdmin){
                          return res.status(500).json({"message":"admin already exists"});
                       }
                        const hashedPassword=bcrypt.hashSync(password);
                        let admin=new Admin({
                                 email,
                                 password:hashedPassword
                        });
                        try {
                             admin= await admin.save();   
                              console.log(admin); 
                        } catch (error) {
                                 console.log(error);
                        }
                         if(!admin){
                                 return res.status(500).json({"message":"some error occurred"});
                         }
                          return res.status(200).json({"message":"Signup Complete"});
   }

    export const loginAdmin=async(req,res,next)=>{
         const {email,password}=req.body;
          if(!email || email.trim()==="" || !password || password.trim()===""){
                 return res.status(401).json({"message":"unauthorize access"});
          }
           let existingAdmin;
           try {
                 existingAdmin= await Admin.findOne({email});
           } catch (error) {
                console.log(error); 
           }
            if(!existingAdmin){
                 return res.status(400).json({"message":"email not found"});
            }
         const ispasswordcorrect=bcrypt.compareSync(password,existingAdmin.password);
          if(!ispasswordcorrect){
                 return res.status(400).json({"message":"Incorrect Password"});
          }
           const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
               expiresIn:"7D"
           });
          return res.status(200).json({"message":"Authentication Complete",token,id:existingAdmin._id});
    }