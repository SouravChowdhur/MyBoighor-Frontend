import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleReadBookPopup } from '../store/slices/popUpSlice';
import Header from '../layout/Header';
import { FaBookOpen } from "react-icons/fa";
import ReadBookPopup from '../popups/ReadBookPopup';

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { readBookPopup } = useSelector((state) => state.popup);
  const [readBook, setReadBook] = useState({})

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  }

  const formatData = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  }

  const [filter, setFilter] = useState("returned");
  const returnedBooks = userBorrowedBooks?.filter((book) => book.returned === true);
  const nonReturnedBooks = userBorrowedBooks?.filter((book) => book.returned === false);
  const booksToDisplay = filter === "returned" ? returnedBooks : nonReturnedBooks;

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-50 min-h-screen">
        <Header />
        <header className='flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-4'>
          <h2 className='text-2xl text-orange-600 font-bold'>
            My Borrowed Books
          </h2>
        </header>

        <div className='flex flex-col gap-3 sm:flex-row md:items-center mb-6'>
          <button className={`transition duration-300 ease-in-out relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-bl-lg sm:rounded-tl-lg text-center font-semibold py-2 border-2 w-full sm:w-72 ${filter === "returned" ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 bg-white text-black hover:bg-gray-100"}`}
            onClick={() => setFilter("returned")}>Returned Books</button>

          <button className={`transition duration-300 ease-in-out relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center font-semibold py-2 border-2 w-full sm:w-72 ${filter === "nonReturned" ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 bg-white text-black hover:bg-gray-100"}`}
            onClick={() => setFilter("nonReturned")}>Non-Returned Books</button>
        </div>

        {
          booksToDisplay && booksToDisplay.length > 0 ? (
            <div className='mt-6 overflow-auto bg-white rounded-lg shadow-xl'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-orange-400 text-white'>
                    <th className='px-4 py-3 text-left'>#</th>
                    <th className='px-4 py-3 text-left'>Book Title</th>
                    <th className='px-4 py-3 text-left'>Date & Time</th>
                    <th className='px-4 py-3 text-left'>Due Date</th>
                    <th className='px-4 py-3 text-left'>Returned</th>
                    <th className='px-4 py-3 text-left'>Read</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    booksToDisplay.map((book, index) => (
                      <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray-100" : "bg-orange-100"}>
                        <td className='px-4 py-2 font-medium'>{index + 1}</td>
                        <td className='px-4 py-2'>{book.bookTitle}</td>
                        <td className='px-4 py-2'>{formatData(book.borrowedDate)}</td>
                        <td className='px-4 py-2'>{formatData(book.dueDate)}</td>
                        <td className='px-4 py-2'>{book.returned ? "Yes" : "No"}</td>
                        <td className='px-4 py-2 text-orange-600 hover:text-orange-800 cursor-pointer transition-transform duration-200 transform hover:scale-110'>
                          <FaBookOpen onClick={() => openReadPopup(book.bookId)} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className='text-2xl text-center text-gray-600 mt-10'>
              {filter === "returned" ? "No Returned Books Found!!" : "No Non-Returned Books Found!!"}
            </h3>
          )
        }
      </main>

      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  )
}

export default MyBorrowedBooks;
