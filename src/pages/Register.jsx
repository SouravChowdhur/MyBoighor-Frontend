import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate, Link} from "react-router-dom";
import {register, resetAuthSlice} from "../store/slices/authSlice.js"
import { toast } from 'react-toastify';
import logo_with_title from "../assets/logo_with_title.png";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {loading,
    error,
    message,
    user,
    isAuthenticated} = useSelector(state => state.auth);
    const navigateTo = useNavigate();

    const handleRegister = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        dispatch(register(data));
    };
    useEffect(()=>{
         if(message){
          navigateTo(`/otp-verification/${email}`);
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
    return  <> 
    <div className='flex flex-col justify-center md:flex-row h-screen'>
      <div className='hidden w-full md:w-1/2 bg-white text-orange-600 border-4 border-orange-600 md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]' >
        <div className='text-center h-[376px]'>
          <div className='flex justify-center mb-12'>
             <img src={logo_with_title} alt="" className='mb-1 h-20 w-auto'/>
          </div>
          <p className='mb-12 text-orange-600'>Already have account? Sign in now.</p>
          <Link to={"/login"} className='border-2 rounded-lg font-semibold border-orange-500 py-2 px-8 hover:bg-orange-500 hover:text-white transition'>
            SIGN IN
          </Link>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex items-center justify-center bg-white p-8'>
           <div className='w-full max-w-sm'>
            <div className='flex justify-center mb-12'>
              <div className='flex flex-col-reverse sm:flex-row items-center justify-center gap-5'>
                <h3 className='font-medium text-4xl overflow-hidden text-orange-500 '>Sign Up</h3>
                <img src = {logo_with_title} alt="" className='h-auto w-24 object-cover'/>
              </div>
            </div>
              <p className='text-center mb-12 text-orange-500'>Please provide your information to sign up</p>
              <form onSubmit={handleRegister}>
                <div className='mb-2'>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Full Name' className='w-full px-4 py-3 border border-orange-500 rounded-md focus:outline-none'/>
                </div>
                <div className='mb-2'>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-full px-4 py-3 border border-orange-500 rounded-md focus:outline-none'/>
                </div>
                <div className='mb-2'>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full px-4 py-3 border border-orange-500 rounded-md focus:outline-none'/>
                </div>
              <div className='block md:hidden font-semibold mt-5'>
                <p>Already have account?
                  <Link to="/login" className='text-sm text-gray-500 hover:underline'>Sign In</Link>
                </p>
              </div>
              <button type='submit' className='border-2 mt-5 border-orange-500 w-full font-semibold bg-orange-400 text-white py-2 rounded-lg hover:bg-white hover:text-orange-500 transition'>SIGN UP</button>
              </form>
           </div>
      </div>
    </div>
    </>
  
}

export default Register