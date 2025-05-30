import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBook, fetchAllBooks } from '../store/slices/bookSlice';
import { toggleAddBookPopup } from '../store/slices/popUpSlice';

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    dispatch(addBook(formData));
    dispatch(fetchAllBooks());


  }
  return <>
    <div className='fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50'>
      <div className='w-full bg-orange-100 rounded-lg shadow-lg md:w-1/3'>
        <div className='p-6'>
          <h3 className='text-xl mb-4 font-bold text-orange-500'>Add Book</h3>
          <form onSubmit={handleAddBook}>
            <div className='mb-4'>
              <label className='block text-orange-500 font-medium'>Book Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className='w-full px-4 py-2 border-2 border-orange-500 rounded-md ' required />
            </div>
            <div className='mb-4'>
              <label className='block text-orange-500 font-medium'>Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Book Author" className='w-full px-4 py-2 border-2 border-orange-500 rounded-md ' required />
            </div>
            <div className='mb-4'>
              <label className='block text-orange-500 font-medium'>Price(Price for Borrowing)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Book Price" className='w-full px-4 py-2 border-2 border-orange-500 rounded-md ' required />
            </div>
            <div className='mb-4'>
              <label className='block text-orange-500 font-medium'>Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Book Quantity" className='w-full px-4 py-2 border-2 border-orange-500 rounded-md ' required />
            </div>
            <div className='mb-4'>
              <label className='block text-orange-500 font-medium border-2'>Desctiption</label>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Book's description" rows={4} className='w-full px-4 py-2 rounded-md border border-black'/>
            </div>
            <div className='flex justify-end space-x-4'>
              <button className='px-4 py-2 bg-orange-400 rounded-md hover:bg-orange-500' type='button' onClick={() => dispatch(toggleAddBookPopup())}>Close</button>
              <button type='submit' className='px-4 py-2 bg-orange-400 rounded-md hover:bg-orange-500'>Add</button>
            </div>
          </form>
        </div>

      
      </div>
    </div>

  </>
}

export default AddBookPopup