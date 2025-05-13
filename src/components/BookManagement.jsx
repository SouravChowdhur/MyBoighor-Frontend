import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from '../store/slices/popUpSlice';
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";
import Header from "../layout/Header"
import AddBookPopup from '../popups/AddBookPopup';
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import { FaBookOpen, FaPen } from "react-icons/fa"

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const { loading: borrowSliceLoading, error: borrowSliceError, message: borrowSliceMessage } = useSelector((state) => state.borrow);
  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };
  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };
  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, message, error, loading, borrowSliceError, borrowSliceMessage, borrowSliceLoading]);

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchedKeyword)
  );

  return <>
    <main className="relative flex-1 p-6 pt-28 bg-gray-100">
      <Header />
      <header className='flex flex-col gap-3 md:flex-row md:justify-between md:items-center'>
        <h2 className='text-xl text-orange-500 font-medium md:text-2xl md:font-semibold'>
          {user && user.role === "Admin" ? "Book Management" : "Books"}
        </h2>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {
            isAuthenticated && user.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className='w-full sm:w-52 flex gap-4 items-center justify-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-semibold relative'
              >
                <span className='bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5'>
                  +
                </span>
                Add Book
              </button>
            )
          }
          <input
            type="text"
            className='w-full sm:w-52 border p-2 border-orange-500 rounded-md focus:ring-2 focus:ring-orange-500'
            placeholder='Search Books...'
            value={searchedKeyword}
            onChange={handleSearch}
          />
        </div>
      </header>

      {
        books && books.length > 0 ? (
          <div className='mt-6 overflow-auto bg-white rounded-md shadow-lg'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr className='bg-orange-400'>
                  <th className='px-4 py-2 text-left text-white'>ID</th>
                  <th className='px-4 py-2 text-left text-white'>Name</th>
                  <th className='px-4 py-2 text-left text-white'>Author</th>
                  {
                    isAuthenticated && user.role === "Admin" && (
                      <th className='px-4 py-2 text-left text-white'>Quantity</th>
                    )
                  }
                  <th className='px-4 py-2 text-left text-white'>Price</th>
                  <th className='px-4 py-2 text-left text-white'>Availability</th>
                  {
                    isAuthenticated && user.role === "Admin" && (
                      <th className='px-4 py-2 text-center text-white'>Actions</th>
                    )
                  }
                </tr>
              </thead>

              <tbody>
                {
                  searchedBooks.map((book, index) => (
                    <tr key={book._id} className={`hover:bg-orange-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <td className='px-4 py-2'>{index + 1}</td>
                      <td className='px-4 py-2'>{book.title}</td>
                      <td className='px-4 py-2'>{book.author}</td>
                      {
                        isAuthenticated && user.role === "Admin" && (
                          <td className='px-4 py-2'>{book.quantity}</td>
                        )
                      }
                      <td className='px-4 py-2'>{`₹${book.price}`}</td>
                      <td className='px-4 py-2'>{book.availability ? "Available" : "Unavailable"}</td>
                      {
                        isAuthenticated && user.role === "Admin" && (
                          <td className='px-4 py-2 flex space-x-3 justify-center'>
                            <FaBookOpen 
                              onClick={() => openReadPopup(book._id)} 
                              className='cursor-pointer text-blue-500 hover:text-blue-700'
                            />
                            <FaPen 
                              onClick={() => openRecordBookPopup(book._id)} 
                              className='cursor-pointer text-yellow-500 hover:text-yellow-700'
                            />
                          </td>
                        )
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className='text-3xl mt-5 font-medium text-center text-gray-600'>No Books Found in Library</h3>
        )
      }
    </main>

    {addBookPopup && <AddBookPopup />}
    {readBookPopup && <ReadBookPopup book={readBook} />}
    {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
  </>;
};

export default BookManagement;
