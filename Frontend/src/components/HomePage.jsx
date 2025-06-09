import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

const Homepage = () => {
  const {theme}=useAuthStore();
  return (
    <div className='text-base-content flex p-3'>
      {/* Searchbar and chats */}
      <div className='w-2/7 h-screen py-5 ml-4 '>
        <div className='flex items-center mb-4 justify-center '>
          <input 
            type="text" 
            placeholder="Search chats..." 
            className={`input rounded-lg w-4/5 text-base-200  focus:outline-none active:outline-none active:border-0 ${theme=="light"?"bg-gray-200":"bg-gray-200"}`}
          />
        </div>
        <div className='overflow-y-auto h-[calc(100vh-4rem)]'>
          {/* List of chats */}
          <ul className='list-none p-0'>
            <li className='p-2 hover:bg-gray-200 cursor-pointer'>Chat 1</li>
            <li className='p-2 hover:bg-gray-200 cursor-pointer'>Chat 2</li>
            <li className='p-2 hover:bg-gray-200 cursor-pointer'>Chat 3</li>
            {/* Add more chat items as needed */}
          </ul>
        </div>
      </div>
      {/* <hr className='rotate-90 w-full bg-white '></hr> */}
      {/* Selected chat or image pattern */}
      <div className='w-5/7  h-screen '>
    2nd area
      </div>
      
    </div>
  )
}

export default Homepage
