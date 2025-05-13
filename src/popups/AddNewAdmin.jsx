import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addNewAdmin} from "../store/slices/userSlice";
import {toggleAddNewAdminPopup} from "../store/slices/popUpSlice";
import close_icon from "../assets/close_icon.png";
import key_icon from "../assets/key_icon.png"
import placeholder from "../assets/placeholder.jpeg"
const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = ()=>{
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  }
  const handleAddNewAdmin = (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append("name", name);
       formData.append("email", email);
       formData.append("password", password);
       formData.append("avatar", avatar);
       dispatch(addNewAdmin(formData))
  }
  return <>
  
    <div className='fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50'>

      <div className='w-full bg-white rounded-lg shadow-lg md:w-1/3'>
           <div className='p-6'>
            <header className='flex justify-between items-center mb-7 pb-5 border-b-[1px] border-orange-500'>
              <div className='flex items-center gap-3'>
                <img src={key_icon} alt="" className='h-10 w-10 rounded-lg'/>
                <h3 className='text-xl font-bold text-orange-500'>Add New Admin</h3>
              </div>
              <img src={close_icon} alt="" className='h-10 w-10'  onClick={()=>dispatch(toggleAddNewAdminPopup())}/>
            </header>

            <form onSubmit={handleAddNewAdmin}>
              <div className='flex flex-col items-center mb-6'>
                <label htmlFor='avatarInput' className='cursor-pointer'>
                  <img src={avatarPreview?avatarPreview:placeholder} alt="avatar" className='w-24 h-24 rounded-full object-cover'/>
                  <input type="file" id='avatarInput' accept='image/*' className='hidden' onChange={handleImageChange}/>
                </label>
              </div>

              <div className="mb-4">
                <label className='block text-orange-500 font-medium'>Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Admin Name' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
              </div> 

              <div className="mb-4">
                <label className='block text-orange-500 font-medium'>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Admin Email' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
              </div> 

              <div className="mb-4">
                <label className='block text-orange-500 font-medium'>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Admin Password' className='w-full px-4 py-2 border border-orange-500 rounded-md '/>
              </div> 

              <div className='flex justify-end space-x-4'>
                <button type="button" onClick={()=>dispatch(toggleAddNewAdminPopup())} className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>Close</button>
                <button type="submit" className='px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-500 text-white font-bold'>Add</button>
               
              </div>
            </form>
           </div>
      </div>
    </div>
  </>
    
  
}

export default AddNewAdmin