import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { ChartBarStacked, Search } from 'lucide-react';
import NoChatPage from './NoChatPage';
import ChatsSideBar from './ChatsSideBar';
import { useMessageStore } from '../store/useMessageStore';
import ChatContainer from './chatContainer';

const Homepage = () => {
  const { theme } = useAuthStore();
  const {chatSelected}=useMessageStore();
  return (
    <div className=' text-base-content flex justify-center h-screen overflow-hidden'>
      
      {/* Searchbar and chats */}
      <div className={`${chatSelected?'max-lg:hidden':''} px-3 w-full lg:w-2/7 h-full  overflow-y-auto max-lg:flex-col pt-6  lg:ml-4 lg: ${theme=="light"?"border-r-gray-300":"border-r-gray-500"} lg:border-r-1 max-lg:mx-6 flex-shrink-0`}>
      <ChatsSideBar/>
      </div>

      {/* Right section - only shown on md+ */}
      {(!chatSelected) &&<div className={` max-lg:hidden w-5/7 h-[calc(100vh-theme(spacing.20))] `}>
        {/* Right panel content or background */}
        <NoChatPage/>
      </div>
      }

      {(chatSelected) &&<div className='max-lg:w-full overflow-y-auto w-5/7 h-[calc(100vh-5rem)] '>

        {/* Chat Container */}
        <ChatContainer/>
      </div>
      }
    </div>
  );
};

export default Homepage;
