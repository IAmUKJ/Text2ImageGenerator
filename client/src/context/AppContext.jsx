import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()

const AppContextProvider = (props)=>{
    const navigate=useNavigate()
    const[user,setUser]=useState(null);
    const[showLogin,setShowLogin]=useState(false);
    const [credit, setCredit]=useState(false)
    const serverURL=import.meta.env.VITE_BACKEND_URL

    
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get(`${serverURL}/api/user/current`, {
          withCredentials: true, // ✅ important
        });
        setUser(data);
        setCredit(data.creditBalance);
      } catch (err) {
        console.log("No active session", err.response?.data || err.message);
        setUser(null);
      }
    };
    useEffect(()=>{
        fetchCurrentUser()
    },[])
    const generateImage = async(prompt)=>{
        fetchCurrentUser()
        if(credit===0){
            toast.error("No credits left")
            navigate('/buy')
        }
        try{
            const {data}=await axios.post(`${serverURL}/api/image/genImage`,{prompt},{withCredentials:true})
            if(data){
                fetchCurrentUser()
                return data.resultImage
            }
            else{
                console.log(error.message)
                return error.message
            }
        }
        catch(error){
            console.log(error.message)
            fetchCurrentUser()
            if(!credit){
                navigate('/buy')
            }
            return error.message
        }
    }
    const logout = async ()=>{
        try{
            let result=await axios.get(`${serverURL}/api/auth/logout`,{withCredentials:true})
            navigate('/')
            setUser(null)
        }
        catch(error){
            console.log(error)
        }
    }

    const value={
        user, setUser, showLogin, setShowLogin, serverURL, credit, setCredit, logout, generateImage, fetchCurrentUser
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider