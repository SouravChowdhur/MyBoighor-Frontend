import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleReturnBookPopup } from '../store/slices/popUpSlice';
import { toast } from "react-toastify"
import { fetchAllBooks, resetBookSlice } from '../store/slices/bookSlice';
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slices/borrowSlice';
import ReturnBookPopup from "../popups/ReturnBookPopup"
import Header from '../layout/Header';
import { FaUndo } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa'

const Catalog = () => {
  const dispatch = useDispatch();
  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading,
    error,
    allBorrowedBooks,
    message } = useSelector((state) => state.borrow);
  const [filter, setFilter] = useState("borrowed");

  const formatDataAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  }

  const formatData = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
  }

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  })

  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  })

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  }
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading])
  return <>

    <main className="relative flex-1 p-6 pt-28">
      <Header />


      <header className='flex flex-col gap-3 sm:flex-row md:items-center'>
        <button className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-bl-lg sm:rounded-tl-lg text-center font-semibold py-2 border-2 w-full sm:w-72 ${filter === "borrowed" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 bg-gray-200 text-black hover:bg-gray-300"}`}
          onClick={() => setFilter("borrowed")}>
          Borrowed Books
        </button>
        <button className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center font-semibold py-2 border-2 w-full sm:w-72 ${filter === "overdue" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 bg-gray-200 text-black hover:bg-gray-300"}`}
          onClick={() => setFilter("overdue")}>Overdue Borrowers</button>
      </header>

      {
        booksToDisplay && booksToDisplay.length > 0 ? (
          <div className='mt-6 overflow-auto bg-white rounded-md shadow-lg'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr className='bg-orange-400'>
                  <th className='px-4 py-2 text-left'>ID</th>
                  <th className='px-4 py-2 text-left'>Username</th>
                  <th className='px-4 py-2 text-left'>Email</th>
                  <th className='px-4 py-2 text-left'>Price</th>
                  <th className='px-4 py-2 text-left'>Due Date</th>
                  <th className='px-4 py-2 text-left'>Date and Time</th>
                  <th className='px-4 py-2 text-left'>Return</th>
                </tr>
              </thead>
              <tbody>
                {
                  booksToDisplay.map((book, index) => (
                    <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-orange-100"}>
                      <td className='px-4 py-2'>{index + 1}</td>
                      <td className='px-4 py-2'>{book?.user.name}</td>
                      <td className='px-4 py-2'>{book?.user.email}</td>
                      <td className='px-4 py-2'>{book.price}</td>
                      <td className='px-4 py-2'>{formatData(book.dueDate)}</td>
                      <td className='px-4 py-2'>{formatDataAndTime(book.createdAt)}</td>
                      <td className='px-4 py-2'>{book.returnedDate?(<FaCheckCircle className="w-6 h-6"/>):(<FaUndo onClick={()=>openReturnBookPopup(book.book, book?.user.email)} className="w-6 h-6"/>)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) :  (<h3 className='text-3xl mt-5 font-medium'>No {filter === "borrowed" ? "borrowed" : "overdue"} books found!!</h3>)
      }
    </main>
    {returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email}/>}
  </>
}

export default Catalog