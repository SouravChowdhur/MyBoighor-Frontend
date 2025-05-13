import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';
import Header from '../layout/Header';
import { FaBook } from 'react-icons/fa';
import { FaUndo } from 'react-icons/fa';
import logo_with_title from "../assets/logo_with_title.png";
import book_icon from "../assets/book_icon.png";
import admin_icon from "../assets/admin_icon.png";
import return_icon from "../assets/return_icon.png";
import browse_icon from "../assets/browse_icon.jpeg";
import { Pie } from "react-chartjs-2";
import user_icon from "../assets/user_icon.png"


ChartJS.register(
  CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement
);

// [Same imports as before]

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter(user => user.role === "User");
    let numberOfAdmins = users.filter(user => user.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);
    let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(book => book.returnedDate === null);
    let numberOfTotalReturnedBooks = allBorrowedBooks.filter(book => book.returnedDate !== null)
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);

    setTotalBooks(books.length)
  }, [users, allBorrowedBooks]);


  const data = {
    labels: ['Total Borrowed Books', 'Total Returned Books'],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#FFA500", "#FF8C00"],
        hoverOffset: 4
      }
    ]
  }

  return <>
    <main className="relative flex-1 p-6 pt-28 bg-[#f7f8fa]">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row gap-10">
        <div className='flex-[2] flex-col gap-10 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-16 py-5'>
          <div className='flex flex-col w-full gap-4'>
  <Pie data={data} options={{ cutout: 0 }} className='mx-auto lg:mx-0 w-full h-auto' />

  <div className='bg-white shadow-md rounded-lg p-4 flex items-center gap-4'>
    <FaBook className='text-orange-500 text-3xl' />
    <div className='flex flex-col'>
      <h5 className='text-md font-semibold text-gray-800'>Monitor Borrowing Trends</h5>
      <p className='text-sm text-gray-600'>Stay updated with real-time insights on borrowing and returning behavior.</p>
    </div>
  </div>
</div>

          <div className='flex items-center p-6 w-full sm:w-[400px] xl:w-fit xl:p-4 gap-5 h-fit bg-white rounded-xl shadow-md'>
            <img src={logo_with_title} alt="logo" className='w-24 object-contain rounded-md' />
            <span className='w-[2px] bg-gray-300 h-24'></span>
            <div className='flex flex-col gap-3 text-sm font-medium'>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#FFA500]'></span>
                Total Borrowed Books
              </p>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#FF8C00]'></span>
                Total Returned Books
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-[4] flex-col gap-8 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]'>
          <div className='flex flex-col-reverse lg:flex-row gap-7 flex-[4]'>
            <div className='flex flex-col gap-7'>
              {[
                { count: totalUsers, label: "Total User Base", icon: user_icon },
                { count: totalBooks, label: "Total Book Count", icon: book_icon },
                { count: totalAdmin, label: "Total Admin Count", icon: admin_icon }
              ].map(({ count, label, icon }, index) => (
                <div key={index} className='flex items-center gap-4 bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl w-full lg:max-w-[360px]'>
                  <div className='bg-gray-200 h-20 w-20 flex justify-center items-center rounded-lg'>
                    <img src={icon} alt="" className='w-8 h-8' />
                  </div>
                  <span className='w-[2px] bg-gray-300 h-20'></span>
                  <div className='flex flex-col items-center gap-2'>
                    <h4 className='font-extrabold text-3xl text-[#333]'>{count}</h4>
                    <p className='text-gray-600 text-sm'>{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex-1 flex items-center justify-center'>
              <div className='bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-center items-center text-center gap-4'>
                <img src={user && user.avatar?.url} alt="avatar" className='rounded-full h-28 w-28 object-cover border-4 border-[#FFA500]' />
                <h2 className='text-xl 2xl:text-2xl font-semibold'>{user && user.name}</h2>
                <p className='text-gray-600 text-sm 2xl:text-base leading-relaxed'>
                  Welcome to Boighor Admin Panel! You're in control of everything — from books to borrowers.
                  Monitor activity, manage users, and keep things running smoothly.
                  Your role ensures seamless access and reliable service for all.
                  Let's make reading smarter, one admin task at a time!
                </p>
              </div>
            </div>
          </div>
          <div className='hidden xl:flex bg-white p-8 text-lg sm:text-xl xl:text-2xl 2xl:text-4xl font-semibold relative rounded-2xl shadow-md'>
            <h4 className='leading-relaxed'>
              Welcome to Boighor — your ultimate library management system. Manage books, users, and transactions seamlessly with just a few clicks. Track borrowed books, their due dates, and monitor book availability. Boighor makes it easier for admins to oversee all aspects of the library.
            </h4>
            <p className='text-gray-500 text-sm sm:text-base absolute right-6 bottom-4'>~BoiGhor Team</p>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default AdminDashboard;
