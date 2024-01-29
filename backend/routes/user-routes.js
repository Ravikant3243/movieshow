
 
   import express from "express"
   import { deleteUser, getAllUsers, signup, updataeUser, useLogin } from "../controllers/user-controller.js";
     const userRouter=express.Router();
     userRouter.get("/",getAllUsers);
     userRouter.post("/signup",signup);
     userRouter.put("/:id",updataeUser);
      userRouter.delete("/:id",deleteUser);
      userRouter.post("/login",useLogin);
       export default userRouter;