import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';
import Header from '../layout/Header';
import { FaBook } from 'react-icons/fa';
import { FaUndo } from 'react-icons/fa';
import logo_with_title from "../assets/logo_with_title.png";
import book_icon from "../assets/book_icon.png";
import return_icon from "../assets/return_icon.png";
import browse_icon from "../assets/browse_icon.jpeg";
import { Pie } from "react-chartjs-2";


ChartJS.register(
  CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(book => book.returned === false);
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(book => book.returned === true)
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

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
    <main className="relative flex-1 p-6 pt-28">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <div className='flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]'>
          <div className='flex flex-col gap-7 flex-[4]'>
            <div className='flex flex-col lg:flow-row gap-7 overflow-y-hidden'>
              <div className='flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300'>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <span className='bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg'><img src={book_icon} alt="bookIcon" className='w-8 h-8' /></span>
                <p className='text-lg xl:text-xl font-semibold'>Your Borrowed Books List</p>
              </div>
              <div className='flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300'>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <span className='bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg'><img src={return_icon} alt="returnIcon" className='w-8 h-8' /></span>
                <p className='text-lg xl:text-xl font-semibold'>Your Returned Books List</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-7'>
              <div className='flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300'>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <span className='bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg'><img src={browse_icon} alt="bookIcon" className='w-8 h-8' /></span>
                <p className='text-lg xl:text-xl font-semibold'>Let's Browse Books Inventory</p>
              </div>
              <img src={logo_with_title} alt="" className='hidden lg:block justify-end h-14 w-15' />
            </div>
          </div>

          <div className='bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] flex justify-center items-center rounded-2xl'>
            <h4 className='overflow-y-hidden'>Welcome to Boighor — your ultimate library management system.
              Manage books, users, and transactions seamlessly with just a few clicks.
              Track borrowed books, their due dates, and monitor book availability.
              Boighor makes it easier for admins to oversee all aspects of the library.
              </h4>
            <p className='text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]'>~BoiGhor Team</p>
          </div>
        </div>
        <div className='flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5'>
          <div className='xl:flex-[4] flex items-end w-full content-center'>
            <Pie data={data} options={{ cutout: 0 }} className='mx-auto lg:mx-0 w-full h-auto' />
          </div>
          <div className='flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg'>
            <img src={logo_with_title} alt="logo" className='w-20 h-30 2xl:h-40' />
            <span className='w-[2px] bg-black h-full'></span>
            <div className='flex flex-col gap-5'>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#FFA500]'></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#FF8C00]'></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>



  </>
}

export default UserDashboard;