import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Search } from 'lucide-react';
import NoChatPage from './NoChatPage';
import ChatsSideBar from './ChatsSideBar';

const Homepage = () => {
  const { theme } = useAuthStore();

  return (
    <div className=' text-base-content flex max-md:justify-center mt-4  max-md:h-screen mx-6'>
      
      {/* Searchbar and chats */}
      <div className='w-full md:w-2/7 h-screen   max-md:flex-col   py-5 md:ml-4 '>
      <ChatsSideBar/>
      </div>

      {/* Right section - only shown on md+ */}
      <div className='max-md:hidden w-5/7 h-screen p-5'>
        {/* Right panel content or background */}
        <NoChatPage/>
      </div>
    </div>
  );
};

export default Homepage;
