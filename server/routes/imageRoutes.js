import express from 'express'
import { userAuth } from '../middlewares/Auth.js'
import { generateImage } from '../controllers/imageController.js'
const imageRouter=express.Router()

imageRouter.post('/genImage',userAuth,generateImage)

export default imageRouter;