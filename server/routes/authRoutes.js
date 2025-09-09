import express from 'express'
import { registerUser, loginUser, userCredits, logOut } from "../controllers/authController.js";
import { userAuth } from '../middlewares/Auth.js';
const authRouter=express.Router()
authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.get("/logout",logOut)
authRouter.get("/credits",userAuth,userCredits)

export default authRouter;