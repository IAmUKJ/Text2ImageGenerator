import express from 'express'
import {userAuth} from '../middlewares/Auth.js'
import { paymentRazorpay, verifyRazorpay } from '../controllers/paymentController.js'
const paymentRouter=express.Router()

paymentRouter.post('/pay',userAuth,paymentRazorpay)
paymentRouter.post('/verify',userAuth,verifyRazorpay)
export default paymentRouter