import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/slices/authSlice.js"
import { toast } from 'react-toastify';
import {Link, Navigate} from "react-router-dom";
import logo_with_title from "../assets/logo_with_title.png";
import {resetAuthSlice} from "../store/slices/authSlice.js"


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {loading,
    error,
    message,
    user,
    isAuthenticated} = useSelector(state => state.auth);
    const handleLogin = (e)=>{
      e.preventDefault();
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      dispatch(login(data));
  };

  useEffect(()=>{
   
    if(message){
     toast.success(message);
     dispatch(resetAuthSlice());
    }
    if(error){
     toast.error(error);
     dispatch(resetAuthSlice())
    }
    
}, [isAuthenticated, loading, error, dispatch]);
     if(isAuthenticated){
       return <Navigate to = {"/"}/>;
    }
  return <>
    <div className='flex flex-col justify-center md:flex-row h-screen'>
      <div className='w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative'>
     
      <div className='max-w-sm w-full'>
          <div className='flex justify-center mb-12'>
            <div className='rounded-full flex items-center justify-center'>
              <img src={logo_with_title} alt="logo" className='h-24 w-auto'/>
            </div>
          </div>
          <h1 className='text-4xl text-orange-500 font-medium text-center mb-12 overflow-hidden'>Welcome back</h1>
          <p className='text-orange-500 text-center mb-12'>please enter your credentials to login</p>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='px-4 py-3 w-full border border-orange-500 rounded-md focus:outline-none'/>
            </div>
            <div className='mb-4'>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='px-4 py-3 w-full border border-orange-500 rounded-md focus:outline-none'/>
            </div>
            <Link to={"/password/forgot"} className='font-semibold text-black mb-12'>Forgot Password?</Link>
            <div className='block md:hidden font-semibold mt-5'>
              <p>New to our platform? <Link to={"/register"} className='text-sm text-orange-500 hover:underline'>Sign Up</Link></p>
            </div>
            <button type="submit" className='border-2 mt-5 border-orange-500 w-full font-semibold bg-orange-400 text-white py-2 rounded-lg hover:bg-white hover:text-orange-500 transition'>SIGN IN</button>
          </form>
      </div>
      </div>
      <div className='hidden w-full md:w-1/2 bg-white text-orange-600 border-4 border-orange-600 md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]'>
        <div className='text-center h-[400px]'>
          <div className='flex justify-center mb-12'>
            <img src={logo_with_title} alt="logo" className='w-auto h-44 mb-12'/>
          </div>
          <p className='text-orange-500 mb-12'>New to our platform ? Sign Up!</p>
          <Link to={"/register"} className='border-2 mt-5 border-orange-500 w-full font-semibold bg-orange-400 text-white py-2 px-8 rounded-lg hover:bg-white hover:text-orange-500 transition'>SIGN UP</Link>
        </div>
      </div>
     </div>
  </>
}

export default Login