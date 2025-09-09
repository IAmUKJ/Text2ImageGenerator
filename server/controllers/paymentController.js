import razorpay from 'razorpay'
import userModel from '../models/userModel.js'
import transactionModel from '../models/transactionModel.js'
const razorpayInstance= new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const paymentRazorpay = async(req,res)=>{
    try{
        const {userId, planId}=req.body
        const userData=await userModel.findById(userId)

        if(!userId || !planId){
            return res.json({success: false, message: 'Missing Details'})
        }
        let credits, plan, amount, date

        switch(planId){
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
            default:
                return res.json({success: false, message:"Plan not found"})
        }

        date= Date.now();

        const transactionData = {
            userId, plan, amount, credits, date
        }
        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error)
                return res.json({success: false, message: error.message})
            }
            res.json({success: true, order})
        })
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export const verifyRazorpay = async(req,res) =>{
    try{
        const {razorpay_order_id}=req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status==='paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success: false, message: "payment failed"})
            }
            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})
        
            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})

            res.json({success: true, message:"Credits Added"})
        }
        else{
            res.json({success: false, message: "Payment failed"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}