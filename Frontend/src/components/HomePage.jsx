import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Search } from 'lucide-react';
import NoChatPage from './NoChatPage';
import ChatsSideBar from './ChatsSideBar';
import { useMessageStore } from '../store/useMessageStore';

const Homepage = () => {
  const { theme } = useAuthStore();
  const {chatSelected}=useMessageStore();
  return (
    <div className=' text-base-content flex max-md:justify-center  max-md:h-screen'>
      
      {/* Searchbar and chats */}
      <div className={` w-full lg:w-2/7 min-h-screen  max-lg:flex-col pt-6  lg:ml-4 lg: ${theme=="light"?"border-r-gray-300":"border-r-gray-500"} lg:border-r-1 max-lg:mx-6`}>
      <ChatsSideBar/>
      </div>

      {/* Right section - only shown on md+ */}
      <div className='max-lg:hidden w-5/7 h-screen'>
        {/* Right panel content or background */}
        {(!chatSelected)&&<NoChatPage/>}
      </div>
    </div>
  );
};

export default Homepage;
