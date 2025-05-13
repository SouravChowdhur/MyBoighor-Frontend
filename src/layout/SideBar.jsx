import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo_with_title from "../assets/logo_with_title.png";
import dashboard_icon from "../assets/dashboard_icon.jpg";
import book_icon from "../assets/book_icon.png";
import { RiAdminFill } from "react-icons/ri";
import setting_icon from "../assets/setting_icon.png";
import logout_icon from "../assets/logout_icon.jpeg";
import close_icon from "../assets/close_icon.png";
import { toggleAddNewAdminPopup, toggleSettingPopup } from '../store/slices/popUpSlice';
import catalog_icon from "../assets/catalog_icon.jpeg";
import user_icon from "../assets/user_icon.png";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isSidebarOpen, setIsSidebarOpen, setSelectedComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector(state => state.popup);
  const { user, isAuthenticated, loading, error, message } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthSlice());
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <>
      <aside
        className={`${isSidebarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-white text-orange-600 flex-col h-full shadow-md`}
        style={{ position: "fixed" }}
      >
        {/* Logo */}
        <div className="px-6 py-4 mt-4 flex flex-col items-center">
          <img src={logo_with_title} alt="logo" className="h-14 w-14" />
        </div>

        {/* User Info */}
        {isAuthenticated && user && (
          <div className="px-6 py-2 text-center">
            <p className="text-md font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2 mt-4">
          <button onClick={() => setSelectedComponent("Dashboard")} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 ">
            <img src={dashboard_icon} alt="" className="h-10 w-10" /> <span>Dashboard</span>
          </button>

          <button onClick={() => setSelectedComponent("Books")} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 ">
            <img src={book_icon} alt="" className="h-10 w-10" /> <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button onClick={() => setSelectedComponent("Catalog")} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-orange-100">
                <img src={catalog_icon} alt="" className="h-12 w-12" /> <span>Catalog</span>
              </button>
              <button onClick={() => setSelectedComponent("Users")} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-orange-100">
                <img src={user_icon} alt="" className="h-12 w-12" /> <span>Users</span>
              </button>
              <button onClick={() => dispatch(toggleAddNewAdminPopup())} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-orange-100">
                <RiAdminFill className="h-6 w-6" /> <span>Add New Admin</span>
              </button>
            </>
          )}

          {isAuthenticated && user?.role === "User" && (
            <button onClick={() => setSelectedComponent("My Borrowed Books")} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 ">
              <img src={catalog_icon} alt="icon" className="h-12 w-12" /> <span>My Borrowed Books</span>
            </button>
          )}

          {/* Mobile-only settings */}
          <button onClick={() => dispatch(toggleSettingPopup())} className="md:hidden w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-orange-100">
            <img src={setting_icon} alt="icon" className="h-10 w-10" /> <span>Update Credentials</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="px-6 py-4">
          <button onClick={handleLogout} className="w-full py-2 font-medium bg-transparent rounded-md flex items-center justify-center space-x-2 hover:bg-red-100 text-red-600">
            <img src={logout_icon} alt="icon" className="h-6 w-6" /> <span>Log Out</span>
          </button>
        </div>

        {/* Close Icon */}
        <img src={close_icon} alt="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-0 right-4 mt-4 block md:hidden h-6 w-6 cursor-pointer" />
      </aside>

      {/* Popups */}
      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
