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

   export default mongoose.model('Admin',AdminShema);