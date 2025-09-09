import jwt from "jsonwebtoken"
export const userAuth=async(req,res,next)=>{
    try{
        let token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token is not found"})
        }
        let verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()
    }
    catch(error){
        return res.status(500).json({message:`isauth error ${error}`})
    }
}