
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Wifi } from "./Wifi";
import "./Wifi.css";
import React from "react";
import { Link } from "react-router-dom";
import { User,Mail,Lock,Eye, EyeOff,Loader2, Info, AtSign } from 'lucide-react';
import AuthImagePattern from './AuthImagePattern';
import toast from 'react-hot-toast';
const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({email:'',password:''});
  const {login,isLoggingin}=useAuthStore();
  
  const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
  const validateForm=()=>{
    if(!formData.email.trim()) return toast.error("Email is required!");
    if(!formData.password) return toast.error("Password is required!");
    if(!isValidEmail(formData.email)) return toast.error("Enter valid email!");
    return true;
  };
  const handleSubmit=async(e)=>{e.preventDefault();
    const success=validateForm();
    if(success==true) 
      {
        login(formData);
      }
  };
  return (
    <div className="min-h-screen flex items-center justify-evenly px-4 py-2  max-md:mx-auto gap-12 bg-base-200">
      {/* Left side */}
      <div className={`relative z-10 text-base-content rounded-lg shadow-2xl p-8 mx-14 mb-12 w-full max-w-md bg-base-100 `}>
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6" >
            <Wifi status="search" width={"50"} height={"auto"} />
            <p className="lg:text-2xl text-lg font-bold text-base-content">Connectify</p>
          <p className="text-lg font-semibold my-2 text-base-content text-center"  >Welcome back!</p>
          <p className="font-light flex flex-wrap items-center justify-center  text-base-content text-center">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
          <div>
          <label className="mb-1">Email</label>
          <div className="relative w-full">
          <input
            type="text"
            name="email"
            placeholder="you@example.com"
            className="outline-none pl-14 ring-0 focus:ring-0 focus:outline-none input input-bordered w-full placeholder-gray-400 text-base-content"
            onChange={(e)=>{setformData((prev)=>({...prev,[e.target.name]:e.target.value}));}}
          />
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail />
          </div>
          </div>
          </div>
          <div>
         <label className='mb-1'>Password</label>
         <div className='w-full relative'>
          <input
            type={showPassword?"text":"password"}
            placeholder="......."
            name="password"
            value={formData.password}
            className="pl-14 outline-none ring-0 focus:ring-0 focus:outline-none input  w-full  placeholder:text-gray-500 placeholder:text-3xl text-base-content" 
            onChange={(e)=>{setformData((prev)=>({...prev,[e.target.name]:e.target.value}));}}
          />
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock />
          </div>
          <button type='button' className={"hover:cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3".concat(formData.password.length==0?" hidden":"")}  onClick={()=>{setshowPassword(!showPassword)}}>
            {showPassword?(<EyeOff className='text-base-content/90 size-5'/>):(<Eye className='text-base-content/90 size-5'/>)}
          </button>
          </div>
          </div>
          
          <button
            type="submit"
            className=" btn bg-violet-600 hover:bg-violet-800 text-white max-md:text-md md:text-lg font-medium" 
            disabled={isLoggingin}
           
          >
            {
              isLoggingin?<><Loader2 className="size-5 animate-spin"/>Loading...</>:"Sign in"
            }
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-base-content" >
          Don't have an account?{" "}
          <Link to="/signup" className="text-violet-400 hover:underline" >
            Create Account
          </Link>
        </p>
      </div>
     
      {/* right side */}
      <div className="z-10 w-full h-full max-w-xl flex items-center justify-center max-lg:hidden mx-14 ">
    
    <AuthImagePattern
      title="Join our community!"
      subtitle="Connect with your friends, share memories and stay in touch with your loved ones!"
    />
  </div>
    </div>
  );
};

export default LoginPage;
