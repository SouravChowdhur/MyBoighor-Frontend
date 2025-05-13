import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { resetAuthSlice, resetPassword } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import logo_with_title from "../assets/logo_with_title.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {token} = useParams();
  const dispatch = useDispatch();
  const { loading,
    error,
    message,
    user,
    isAuthenticated } = useSelector(state => state.auth);

    const handleResetPassword = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("password",password);
        formData.append("confirmPassword", confirmPassword);
        dispatch(resetPassword(formData, token));
      };

      useEffect(() => {
        if(message){
         toast.success(message);
         dispatch(resetAuthSlice());
        }
        if (error) {
          toast.error(error);
          dispatch(resetAuthSlice())
        }
      }, [isAuthenticated, loading, error, dispatch]);
      
  return <>
   <div className='flex flex-col justify-center md:flex-row h-screen'>
       <div className='hidden w-full md:w-1/2 bg-white text-orange-600 border-4 border-orange-600 md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]'>
       <div className='text-center h-[450px]'>
                 <div className='flex justify-center mb-12'>
                     <img src={logo_with_title} alt="" className='h-44 w-auto mb-12'/>
                 </div>
                 <h3 className='text-orange-500 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10'>"Books are portals to new worlds—each page is a step toward wisdom, wonder, and imagination."</h3>
               </div>
       </div>
       <div className='w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative'>
        <Link to={"/password/forgot"} className="border-2 border-orange-500 font-bold rounded-3xl w-52 py-2 px-4 text-orange-500 fixed top-10 -left-28 hover:bg-orange-500 hover:text-white transition duration-300 text-end">Back</Link>
        <div className='w-full max-w-sm'>
          <div className='flex justify-center mb-12'>
            <div className='rounded-full flex justify-center items-center'>
              <img src={logo_with_title} alt="" className='w-auto h-24' />
            </div>
          </div>
          <h1 className='text-4xl font-medium text-center mb-5 overflow-hidden'>Reset password ?</h1>
          <p className='text-center mb-12 text-orange-500'>Please enter your new password</p>
          <form onSubmit={handleResetPassword}>
            <div className='mb-4'>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='px-4 py-3 w-full border border-orange-500 rounded-md focus:outline-none' />
            </div>
            <div className='mb-4'>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='px-4 py-3 w-full border border-orange-500 rounded-md focus:outline-none' />
            </div>
            <button type="submit" className='border-2 mt-5 border-orange-500 w-full font-semibold bg-orange-400 text-white py-2 rounded-lg hover:bg-white hover:text-orange-500 transition' disabled={loading ? true : false}>RESET PASSWORD</button>
          </form>
        </div>
      </div>
   </div>
  </>
}

export default ResetPassword