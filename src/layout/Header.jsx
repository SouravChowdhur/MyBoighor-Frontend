import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import setting_icon from "../assets/setting_icon.png";
import { toggleSettingPopup } from '../store/slices/popUpSlice';

const Header = () => {
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
       const updateDateTime = () => {
          const now = new Date();
          const hours = now.getHours() % 12 || 12;
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const ampm = now.getHours() >= 12 ? "PM" : "AM";
          setCurrentTime(`${hours}:${minutes}:${ampm}`);

          const options = { month: "short", day: "numeric", year: "numeric" };
          setCurrentDate(now.toLocaleDateString("en-US", options));
       };
       updateDateTime();
       const intervalId = setInterval(updateDateTime, 1000);
       return () => clearInterval(intervalId);
    }, []);

    return (
      <header className='absolute top-0 bg-white py-4 px-6 w-full left-0 shadow-md flex justify-between items-center'>
        {/* Time and Date Section */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{currentTime}</span>
          <span className="text-sm font-medium">{currentDate}</span>
        </div>

        {/* Settings Button */}
        <div className="flex items-center gap-4">
          <span className='bg-black h-10 w-[2px]'></span>
          <img
            src={setting_icon}
            alt="settingIcon"
            className='w-8 h-8 cursor-pointer'
            onClick={() => dispatch(toggleSettingPopup())}
          />
        </div>
      </header>
    );
}

export default Header;
