import React, { useEffect, useState } from 'react'
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import logo_with_title from "../assets/logo_with_title.png";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading,
    error,
    message,
    user,
    isAuthenticated } = useSelector(state => state.auth);
  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  }
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice())
    }
  }, [isAuthenticated, loading, error, dispatch]);
  
  return <>
     <div className='flex flex-col justify-center md:flex-row h-screen'>
      <div className='w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative'>
      <Link to={"/register"} className="border-2 border-orange-500 font-bold rounded-3xl w-52 py-2 px-4 text-orange-500 fixed top-10 -left-28 hover:bg-orange-500 hover:text-white transition duration-300 text-end">Back</Link>
      <div className='max-w-sm w-full'>
          <div className='flex justify-center mb-12'>
            <div className='rounded-full flex items-center justify-center'>
              <img src={logo_with_title} alt="logo" className='h-24 w-auto'/>
            </div>
          </div>
          <h1 className='text-4xl text-orange-500 font-medium text-center mb-12 overflow-hidden'>check your mailbox</h1>
          <p className='text-orange-500 text-center mb-12'>please enter the otp to proceed</p>
          <form onSubmit={handleOtpVerification}>
            <div className='mb-4'>
              <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='OTP' className='px-4 py-3 w-full border border-orange-500 rounded-md focus:outline-none'/>
            </div>
            <button type="submit" className='border-2 mt-5 border-orange-500 w-full font-semibold bg-orange-400 text-white py-2 rounded-lg hover:bg-white hover:text-orange-500 transition'>VERIFY</button>
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

export default OTP