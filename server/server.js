import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import paymentRouter from './routes/transactionRoutes.js'
const port = process.env.PORT || 5000
const app= express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://text2imagegenerator-1.onrender.com",
    credentials:true
}
))
await connectDB()
app.use('/api/auth',authRouter)
app.use('/api/image',imageRouter)
app.use('/api/user',userRouter)
app.use('/api/buy',paymentRouter)
app.get('/',(req,res)=> res.send("API Working fine"))

app.listen(port, ()=>console.log(`Server started at ${port}`)) 