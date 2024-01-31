 import mongoose from "mongoose";
 import { Schema } from "mongoose";
  const AdminShema=new Schema({
       
       email:
       {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    addedMovies:[
        {
            type:String,
        },
    ],
  });

const Admin= mongoose.model('Admin',AdminShema);
 export default Admin;