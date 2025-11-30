import React, { useEffect, useRef, useState } from 'react'
import ToggleTheme from './ToggleTheme'
import { Wifi } from './Wifi'
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { Bell, LogOut,Settings,User, UserPlus} from 'lucide-react';
import SearchUsers from './SearchUsers';
import { useMessageStore } from '../store/useMessageStore';

const Navbar = () => {
  const {authUser,logout}=useAuthStore();
  const {isSearchOpen,setSearchOpen}=useMessageStore();
  const location=useLocation();
  return (
    <>
    <div className='w-full relative flex items-center h-20 shadow-lg pl-4'>
        <Link to="/">
      <Wifi  status="search" width={"40"} height={"auto"} />
      </Link>
      <Link to="/">
      <span className="text-md font-semibold lg:text-2xl ml-3 lg:font-bold text-base-content tracking-wide">
   Connectify
  </span>
  </Link>
  {
      <ToggleTheme className="absolute right-4 "/>
  }
      {/* for >=lg */}
    {
      authUser &&<div className="absolute right-16 flex justify-around   max-lg:hidden">
        <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <Settings className='size-8'  />
        {/* <span className='text-md lg:text-xl'>Settings</span> */}
        </div>
        <Link to="/notifications">
        <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <Bell className='size-8 cursor-pointer'/>
        {/* <span className='text-md lg:text-xl'>Profile</span> */}
        </div>
        </Link>
        <Link to="/profile">
        <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <User className='size-8 cursor-pointer'/>
        {/* <span className='text-md lg:text-xl'>Profile</span> */}
        </div>
        </Link>
        {(location.pathname=="/")&&(<div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <UserPlus className='size-8 cursor-pointer' onClick={() => setSearchOpen(true)} />
        </div>)
        }
          <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <LogOut className='size-8 cursor-pointer' onClick={logout} />
        {/* <span className='text-md lg:text-xl'>Logout</span> */}
        </div>
        {isSearchOpen && <SearchUsers/>}
        </div>
    }
    {/* for <lg */}
    </div>
    
    </>
  )
}

export default Navbar
