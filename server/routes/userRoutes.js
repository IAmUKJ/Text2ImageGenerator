import express from 'express'
import { getCurrentUser } from '../controllers/userController.js'
import { userAuth } from '../middlewares/Auth.js'
const userRouter = express.Router()

userRouter.get("/current", userAuth ,getCurrentUser)

export default userRouter