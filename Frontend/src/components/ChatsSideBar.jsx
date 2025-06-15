import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Search } from 'lucide-react';

const ChatsSideBar = () => {
    const {theme}=useAuthStore();
  return (
    <div>
      {/* Centered fixed-width wrapper on small screens */}
        <div className={`w-full h-screen full p-3  md: ${theme=="light"?"border-r-gray-300":"border-r-gray-500"} md:border-r-1 md:pr-5 `}>
          <div className='flex items-center mb-4 relative w-full '>
            <input 
              type="text" 
              placeholder="Search chats" 
              className={`text-center w-full outline-none ring-0 focus:ring-0  focus:outline-none focus:border-text-base-content focus:border-1 input input-bordered rounded-lg placeholder-gray-400 bg-base-100 text-base-content ${theme=="light"?"border-gray-300":"border-gray-500"}`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className='text-gray-400'/>
            </div>
          </div>
          <hr className={`my-2 bg-gray-500 ${theme=="light"?"border-gray-300":"border-gray-500"}`}></hr>
          <div className='overflow-y-auto max-h-[70vh]'>
            <div className='h-14 rounded-xl flex items-center '>
              <div className='rounded-full bg-gray-400 w-12 h-12'></div>
            </div>
          </div>
          <hr className={`my-2 bg-gray-500 ${theme=="light"?"border-gray-300":"border-gray-500"}`}></hr>
        </div>
    </div>
  )
}

export default ChatsSideBar
