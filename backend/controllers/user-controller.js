  
    import User from '../models/User.js'
    import bcrypt from 'bcryptjs'
    export const getAllUsers= async(req,res,next)=>{
             let users;
              try{
               users=await User.find();
              }
              catch(error){
                next(error);
              }
               if(!users){
                  return res.status(500).json({"message":"unexpected error"});
               }
                return res.status(200).json({users});

    }

   export const signup=async(req,res)=>{
          const {name,email,password}=req.body;
           if(!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim===""){
             return res.status(422).json({"message":"invalid inputs"});
           }
           let user;
            const hashedPassword=bcrypt.hashSync(password);
           try {
                 user=new User({name,email,password:hashedPassword});
                user= await user.save();
           } catch (error) {
             return console.log(error);
           }
            if(!user){
               return res.status(500).json({"message":"can not signup"})
            }
             return res.status(201).json({"message":"user signedup succesfully"});
    }
 export const updataeUser=async(req,res,next)=>{
       const  id=req.params.id;
       const {name,email,password}=req.body;
           if(!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim===""){
             return res.status(422).json({"message":"invalid inputs"});
           }
          let user;
           try {
              user=await User.findByIdAndUpdate({_id:id},req.body,{new:true});
              
           } catch (error) {
             console.log(error);
           }
            if(!user){
                return res.status(500).json({"message":"something went wrong"});
            }
             return res.status(200).json({"message":"updated succesfully"});
 }
   export const deleteUser= async(req,res,next)=>{
         const id=req.params.id;
         let user;
          try {
               user= await User.findByIdAndDelete({_id:id});
          } catch (error) {
             console.log("some error occured");
          }
           if(!user){
            console.log("some error occured");
              return res.status(500).json({"message":"user not found"});
           }
            
               console.log("user deleted succesfully");
              return  res.status(200).json({"message":"user deleted succesfully"});
            
   }
   export const useLogin= async(req,res,next)=>{
       const {email,password}=req.body;
       
       if( !email || email.trim()==="" || !password || password.trim===""){
         return res.status(422).json({"message":"invalid user"});
       }
     
       let existingUser;
        try {
          existingUser= await User.findOne({email})
        } catch (error) {
            console.log(error);
        }
         if(!existingUser ){
           console.log("user not found signup first");
            return res.status(404).json({"message":"User not found"});
         }

         const ispasswordcorrect=bcrypt.compareSync(password,existingUser.password);
          if(!ispasswordcorrect){
            console.log("incorrect password");
            return res.status(400).json({"message":"incorrect password"});
          }
            console.log("user logged in succesfully");
            return res.status(200).json({"message":"user logged in succesfully"});
   }