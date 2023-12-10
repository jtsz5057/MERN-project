import React, { useState }from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  // State variable to manage loading state
  const [loading, setLoading] = useState(false);

  // React Router hooks for navigation and accessing URL parameters
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle deleting a book
  const handleDeleteBook = () => {
     // Set loading to true to show a loading spinner
    setLoading(true);

    // Make a DELETE request to the backend API to delete the specified book
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        // On success, set loading to false, navigate back to the main page,
        // and provide a console log indicating a successful deletion
        setLoading(false);
        navigate('/');
        // Note: This alert seems misplaced and may cause issues.
        alert('An error happened. Please check console')
        console.log(error);
      })
      .catch((error) => {
        setLoading(false);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}>
            Yes, Delete it
          </button>
      </div>
    </div>
  )
}

export default DeleteBook