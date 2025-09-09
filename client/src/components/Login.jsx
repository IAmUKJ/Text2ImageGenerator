import React, { useContext, useEffect, useState } from 'react'
import { assets }from '../assets/assets'
import { FaUserCircle } from "react-icons/fa";
import {motion} from 'framer-motion'
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const {setUser, serverURL, setShowLogin, setCredit}=useContext(AppContext)
    let [state, setState] = useState("Login")
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(state==='Login'){
            try {
                let result = await axios.post(`${serverURL}/api/auth/login`, {email, password}, {withCredentials: true})
                setUser(result.data)
                setCredit(result.data.creditBalance)
                setShowLogin(false)
                navigate("/")
                setName("")
                setEmail("")
                setPassword("")
                setLoading(false)
                setErr("")
            } catch(error) {
                console.log(error)
                setLoading(false)
                setErr(error?.response?.data?.message)
                toast.error(error.response.data.message)
            }
        }
        else{
            try {
                let result = await axios.post(`${serverURL}/api/auth/register`, {name, email, password}, {withCredentials: true})
                setUser(result.data)
                setCredit(result.data.creditBalance)
                setShowLogin(false)
                navigate("/result")
                setName("")
                setEmail("")
                setPassword("")
                setLoading(false)
                setErr("")
            } catch(error) {
                console.log(error)
                setLoading(false)
                setErr(error?.response?.data?.message)
                toast.error(error.response.data.message)
            }
        }
    }
    useEffect(()=>{
        document.body.style.overflow='hidden';
        return ()=>{
            document.body.style.overflow='unset';
        }
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-slate-500'
        initial={{opacity:0.2, y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        >
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            
            {state!='Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <FaUserCircle className='text-gray-400'/>
                <input onChange={e=> setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full name' required />
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e=> setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email Id' required />
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e=> setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
            </div>
            
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login'?'Login':'create account'}</button>
            {state==='Login'?<p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('SignUp')}>Sign Up</span></p>:
            <p className='mt-5 text-center'onClick={()=>setState('Login')}>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>}
        
            <img src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' onClick={()=>setShowLogin(false)}/>
        </motion.form>
    </div>
  )
}

export default Login