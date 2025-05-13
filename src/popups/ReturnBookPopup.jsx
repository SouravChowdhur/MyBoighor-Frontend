import React from 'react'
import { useDispatch } from 'react-redux';
import { returnBook } from '../store/slices/borrowSlice';
import { toggleReturnBookPopup } from '../store/slices/popUpSlice';

const ReturnBookPopup = ({bookId, email}) => {
  const dispatch = useDispatch();
   const handleReturnBook = (e) => {
      e.preventDefault();
      dispatch(returnBook(email, bookId));
      dispatch(toggleReturnBookPopup());
    }
  return <>
  <div className='fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50'>
        <div className='w-full bg-orange-100 rounded-lg shadow-lg md:w-1/3'>
          <div className='p-6'>
            <h3 className='text-xl mb-4 font-bold text-orange-500'>Return Book</h3>
            <form onSubmit={handleReturnBook}>
              <div className='mb-4'>
                <label className='block text-orange-500 font-medium'>User Email</label>
                <input type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} placeholder="Borrower's Email" className='w-full px-4 py-2 border-2 border-orange-500 rounded-md ' required disabled/>
              </div>
              <div className='flex justify-end space-x-4'>
                <button className='px-4 py-2 bg-orange-400 rounded-md hover:bg-orange-500' type='button' onClick={() => dispatch(toggleReturnBookPopup())}>Close</button>
                <button type='submit' className='px-4 py-2 bg-orange-400 rounded-md hover:bg-orange-500'>Return</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
  </>
  
}

export default ReturnBookPopup