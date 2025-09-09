import genToken from "../config/token.js"
import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
export const registerUser=async (req,res)=>{

    try{
        const {name,email,password}=req.body
        const checkUserByEmail=await userModel.findOne({email})
        if(checkUserByEmail){
            return res.status(400).json({message: "email already exists"})
        }
        if(password.length<8){
            return res.status(400).json({message: "Password must be of atleast 8 characters"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await userModel.create({
            name,email,password:hashedPassword
        })

        const token=genToken(user._id)
        
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        return res.status(201).json(user)
    }
    catch(error){
        return res.status(500).json({message: `signup error ${error}`})
    }
}

export const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"})
        }

        const token = genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        return res.status(200).json(user)
    }

    catch(error){
        return res.status(500).json({message:`login error ${error}`})
    }
}

export const logOut=async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Log Out Successfully"})
    }

    catch(error){
        return res.status(500).json({message:`logout error ${error}`})
    }
}

export const userCredits = async (req, res) => {
  try {
    const userId = req.userId; // ✅ comes from JWT middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
