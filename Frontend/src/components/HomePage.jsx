import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Search } from 'lucide-react';
import NoChatPage from './NoChatPage';
import ChatsSideBar from './ChatsSideBar';

const Homepage = () => {
  const { theme } = useAuthStore();

  return (
    <div className=' text-base-content flex max-md:justify-center  max-md:h-screen'>
      
      {/* Searchbar and chats */}
      <div className={` w-full md:w-2/7 min-h-screen  max-md:flex-col pt-6  md:ml-4 md: ${theme=="light"?"border-r-gray-300":"border-r-gray-500"} md:border-r-1 max-md:mx-6`}>
      <ChatsSideBar/>
      </div>

      {/* Right section - only shown on md+ */}
      <div className='max-md:hidden w-5/7 h-screen'>
        {/* Right panel content or background */}
        <NoChatPage/>
      </div>
    </div>
  );
};

export default Homepage;
