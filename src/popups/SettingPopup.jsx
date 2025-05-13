import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {updatePassword} from "../store/slices/authSlice"
import setting_icon from "../assets/setting_icon.png"
import { toggleSettingPopup } from '../store/slices/popUpSlice'
import close_icon from "../assets/close_icon.png";

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth);
  const handleUpdatePassword = (e)=>{
       e.preventDefault();
       const data = new FormData();
       data.append("currentPassword", currentPassword);
       data.append("newPassword", newPassword);
       data.append("confirmNewPassword", confirmNewPassword);
       dispatch(updatePassword(data));
  }
  return <>
   <div className='fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50'>
  
        <div className='w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3'>
             <div className='p-6'>
              <header className='flex justify-between items-center mb-7 pb-5 border-b-[1px] border-orange-500'>
                <div className='flex items-center gap-3'>
                  <img src={setting_icon} alt="setting icon" className='h-10 w-10 rounded-lg'/>
                  <h3 className='text-xl font-bold text-orange-500'>Change Credentials</h3>
                </div>
                <img src={close_icon} alt="" className='h-10 w-10'  onClick={()=>dispatch(toggleSettingPopup())}/>
              </header>
  
              <form onSubmit={handleUpdatePassword}>
  
                <div className="mb-4 sm:flex gap-4 items-center">
                  <label className='block text-orange-500 font-medium w-full'>Enter Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} placeholder='Current Password' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
                </div> 
  
                <div className="mb-4 sm:flex gap-4 items-center">
                  <label className='block text-orange-500 font-medium w-full'>Enter New Password</label>
                  <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='New Password' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
                </div> 
  
                <div className="mb-4 sm:flex gap-4 items-center w-full">
                  <label className='block text-orange-500 font-medium'>Enter Confirm New Password</label>
                  <input type="password" value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)} placeholder='Confirm New Password' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
                </div> 
  
                {/* <div className='flex justify-end space-x-4'>
                  <button type="button" onClick={()=>dispatch(toggleAddNewAdminPopup())} className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>Close</button>
                  <button type="submit" className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>Add</button>
                 
                </div> */}
                <div className='flex gap-4 mt-10'>
                <button type="button" onClick={()=>dispatch(toggleSettingPopup())} className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>CANCEL</button>
                <button type="submit" className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>CONFIRM</button>
                </div>
              </form>
             </div>
        </div>
      </div>
  
  </>
    
  
}

export default SettingPopup