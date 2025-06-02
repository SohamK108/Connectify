
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Wifi } from "./Wifi";
import "./Wifi.css";
import React from "react";
import { Link } from "react-router-dom";
import { User,Mail,Lock,Eye, EyeOff,Loader2, Info, AtSign } from 'lucide-react';
import AuthImagePattern from './AuthImagePattern';
import toast from 'react-hot-toast';
const SignUpPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showUserNameRules, setshowUserNameRules] = useState(false);
  const [formData, setformData] = useState({fullName:'',email:'',userName:'',password:''});
  const {theme,signUp,isSigningUp}=useAuthStore();
  const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
  const validateForm=()=>{
    if(!formData.fullName.trim()) return toast.error("Full name is required!");
    if(!formData.email.trim()) return toast.error("Email is required!");
    if(!formData.password) return toast.error("Password is required!");
    if(formData.password.length<6) return toast.error("Password must contain atleast 6 characters!");
    if(!formData.userName) return toast.error("Username is required!");
    if(!isValidEmail(formData.email)) return toast.error("Enter valid email!");
    return true;
  };
  const handleSubmit=(e)=>{e.preventDefault();
    const success=validateForm();
    if(success==true) signUp(formData);

  };
  const handleToolTipClick = () => {
  setshowUserNameRules(true);
  const timeout = setTimeout(() => {
     setshowUserNameRules(false);
  }, 2000); // 3 seconds
};
  return (
    <div className="min-h-screen flex items-center justify-evenly px-4 py-2  max-md:mx-auto gap-12 bg-base-200">
      {/* Left side */}
      <div className={`relative z-10 text-base-content rounded-lg shadow-2xl p-8 mx-14 mb-12 w-full max-w-md bg-base-100 `}>
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6" >
            <Wifi status="search" width={"50"} height={"auto"} />
            <p className="lg:text-2xl text-lg font-bold text-base-content">Connectify</p>
          <p className="text-lg font-semibold my-2 text-base-content text-center"  >Create Account</p>
          <p className="font-light flex flex-wrap items-center justify-center  text-base-content text-center">Get started with your free acount</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
          <div> 
          <label className='mb-1'>Full Name</label>
          <div className='relative w-full'>
          <input
            type="text"
            name='fullName'
            placeholder="John Doe"
            className="pl-14 outline-none ring-0 focus:ring-0 focus:outline-none input  w-full bg-base- placeholder-gray-400 text-base-content"
            onChange={(e)=>{setformData((prev)=>({...prev,[e.target.name]:e.target.value}));}}
          />
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
            <User />
          </div>
          </div>
          </div>
          <div> 
          <label className='mb-1'>Username</label>
          <div className='relative w-full'>
          <input
            type="text"
            name='userName'
            placeholder="johndoe"
            className="pl-14 outline-none ring-0 focus:ring-0 focus:outline-none input  w-full bg-base- placeholder-gray-400 text-base-content"
            onChange={(e)=>{setformData((prev)=>({...prev,[e.target.name]:e.target.value}));}}
          />
         <button
  type="button"
  className="absolute inset-y-0 right-0 flex items-center pr-3"
  onClick={handleToolTipClick}
  onMouseEnter={()=>{setshowUserNameRules(true);
    handleToolTipClick();
  }}
>
            {(<Info className='text-base-content/90  max-lg:text-md'/>)}
             {showUserNameRules && (
                  <div className="absolute  top-12 w-32 bg-base-200 text-base-content text-sm rounded-lg p-2 shadow-lg z-10 text-left">
                    <ol className='list-decimal list-inside'>
                      <li >Must be 2-10 characters long.</li>
                      <li>Can only contain lowercase alphabets, numbers, periods, and underscores.</li>
                      <li>Cannot contain spaces and special characters except . and _</li>
                      <li>Must start with a letter only.</li>
                    </ol>
                  </div>
                )}
          </button>
         
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
            <AtSign />
          </div>
          </div>
          </div>
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
            onChange={(e)=>{setformData((prev)=>({...prev,[e.target.name]:e.target.value}));console.log(formData.password.length)}}
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
            className="btn bg-violet-600 hover:bg-violet-800 text-white max-md:text-md md:text-lg font-medium" 
            disabled={isSigningUp}
           
          >
            {
              isSigningUp?<><Loader2 className="size-5 animate-spin"/>Loading...</>:"Create Account"
            }
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-base-content" >
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:underline" >
            Log in
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

export default SignUpPage;
