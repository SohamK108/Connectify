import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Search } from 'lucide-react';

const Homepage = () => {
  const { theme } = useAuthStore();

  return (
    <div className='text-base-content flex max-md:justify-center mt-4  max-md:h-screen mx-6'>
      
      {/* Searchbar and chats */}
      <div className='w-full md:w-2/7 h-screen   max-md:flex-col   py-5 md:ml-4'>

        {/* Centered fixed-width wrapper on small screens */}
        <div className='w-full '>
          <div className='flex items-center mb-4 relative w-full'>
            <input 
              type="text" 
              placeholder="Search chats" 
              className={`text-center w-full outline-none ring-0 focus:ring-0 focus:outline-none focus:border-text-base-content focus:border-2 input input-bordered rounded-lg placeholder-gray-400 ${theme === "light" ? "bg-gray-100" : "bg-gray-200"} ${theme === "light" ? "text-base-content" : "text-base-200"}`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className='text-gray-400'/>
            </div>
          </div>

          <div className='overflow-y-auto max-h-[70vh]'>
            <div className='h-16  rounded-xl border-2 border-gray-400'>Hello</div>
          </div>
        </div>
      </div>

      {/* Right section - only shown on md+ */}
      <div className='hidden md:block w-5/7 h-screen'>
        {/* Right panel content or background */}
        2nd area
      </div>
    </div>
  );
};

export default Homepage;
