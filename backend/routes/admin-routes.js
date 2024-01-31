import express from "express"
import { addAdmin, getAllAdmins, loginAdmin } from '../controllers/admin-controller.js';
   const adminRouter=express.Router();

   adminRouter.get("/",getAllAdmins);
   adminRouter.post("/signup",addAdmin)
   adminRouter.post("/login",loginAdmin)
    export default adminRouter;