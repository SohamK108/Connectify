import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import OtherUserProfilePage from './components/OtherUserProfilePage';


function App() {
  const {theme,authUser,checkAuth,isCheckingAuth}=useAuthStore();

  const location = useLocation();

  const isHome = location.pathname === "/";

 useEffect(() => {
  checkAuth(); 
}, [checkAuth]);

useEffect(() => { 
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [theme]);
  if(isCheckingAuth )
  {
    return (
      <div className={`h-screen bg-base-200`}>
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-ring text-white w-24 h-24 "></span>
        </div>
      </div>
    );
  }
  return (
    <div className='h-screen'>
      <Navbar />
    <div className={`h-[calc(100vh-theme(spacing.20))] ${isHome?'overflow-hidden':'overflow-y-auto'}`} >
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to="/login"/>} />
        <Route path="/login" element={authUser?<Navigate to="/"/>:<LoginPage />} />
        <Route path="/signup" element={authUser?<Navigate to="/"/>:<SignUpPage />} />
        <Route path="/settings" element={authUser?<SettingsPage />:<Navigate to="/"/>} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/"/>} />
        <Route path="/profile/:userName" element={authUser?<OtherUserProfilePage />:<Navigate to="/"/>} />
      </Routes>
      <Toaster/>
    </div>
    </div>
  );
}

export default App


