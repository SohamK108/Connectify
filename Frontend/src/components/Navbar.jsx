import React from 'react'
import ToggleTheme from './ToggleTheme'
import { Wifi } from './Wifi'
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { LogOut,Settings,User} from 'lucide-react';
const Navbar = () => {
  const {authUser,logout}=useAuthStore();
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
      authUser &&<div className="absolute right-16 flex justify-around   max-sm:hidden">
        <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <Settings className='size-8'  />
        {/* <span className='text-md lg:text-xl'>Settings</span> */}
        </div>
        <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <User className='size-8 cursor-pointer'/>
        {/* <span className='text-md lg:text-xl'>Profile</span> */}
        </div>
          <div className='flex gap-2 items-center  rounded-xl p-3 cursor-pointer'>
        <LogOut className='size-8 cursor-pointer' onClick={logout} />
        {/* <span className='text-md lg:text-xl'>Logout</span> */}
        </div>
        </div>
    }
    {/* for <lg */}
    </div>
    
    </>
  )
}

export default Navbar
