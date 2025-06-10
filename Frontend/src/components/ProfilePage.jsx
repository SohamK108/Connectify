import { User,Mail, AtSign,Camera, RefreshCcw, CircleUserRound} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import "../index.css"
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";


const handleImageChange = async (e) => {
    // const file = e.target.files[0];
    // if (!file) return;

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
    // formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    // try {
    //   const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const data = await res.json();
    //   setImagePreview(data.secure_url);
    // } catch (error) {
    //   console.error("Upload failed:", error);
    // }
  };
 
const ProfilePage = () => {

   const [rotating, setRotating] = useState(false);

  const {authUser,setRandomAvatar,setAvatar}=useAuthStore();
  
  const handleProfilePhotochange = () => {
    if (rotating) return; // Prevent multiple clicks while rotating
    setRotating(true);
    setRandomAvatar();
        // Stop rotating after 250ms (duration of animation)
    setTimeout(() => setRotating(false), 250);
  };
  const handleDefaultAvatarChange=()=>{
    const res=setAvatar("https://imgs.search.brave.com/olU1frCI_rKOD3-NBWDPcqTpdn8YDMNYb2wVQ2TmqlM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc");
    
  };
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center ">
      {/* profile box starts */}
      <div className="relative container z-10 rounded-lg shadow-2xl p-8 mx-14 my-8 w-2/3 lg:w-1/3  bg-base-100">
        <div
          className={` text-base-content md:text-2xl text-md font-bold mb-3  rounded lg text-center`}
        >
          Profile
        </div>
        <div className="text-center mb-2">Your profile information</div>
        <div className="flex items-center justify-center relative">
          <div className="flex-col items-center justify-center min-w-36">
            <div className="flex justify-center items-center">
          <img
            src={authUser.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-base-300 "
          />
          </div>
          <div className="flex justify-around  mt-3  items-center ">
            <label name="camera" className="cursor-pointer p-2 rounded-full bg-violet-500 hover:bg-violet-800">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Camera className=" text-base-content" />
            </label>
            <button className="cursor-pointer p-2 rounded-full bg-violet-500 hover:bg-violet-800" onClick={handleDefaultAvatarChange}>
        <CircleUserRound className="text-base-content"/>
        </button>
          <button onClick={handleProfilePhotochange} className="cursor-pointer bg-violet-500 p-2 rounded-full hover:bg-violet-800" ><RefreshCcw className={`text-base-content transform transition-transform  ease-in-out ${
          rotating ? 'spin-once':''
        }`} /></button>
        
          </div>
          </div>
        </div>
        {/* fields start */}
        <div className="mb-3">
        <div className="mb-1" >Username</div>
        <div>
          <div className="relative w-full border-base-content border-1 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              {authUser.userName}
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <AtSign />
            </div>
          </div>
        </div>
        </div>
        {/* {first field ends} */}
        <div>
        <div className="mb-3">
        <div className="mb-1">Full name</div>
        <div>
          <div className="relative w-full border-base-content border-1 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              {authUser.fullName}
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <User />
            </div>
          </div>
        </div>
        </div>
        {/* second field ends */}
         <div className="mb-3">
           <div className="mb-1">Email</div>
        <div>
          <div className="relative w-full border-base-content border-1 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              {authUser.email}
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail />
            </div>
          </div>
        </div>
        </div>
         {/* third field ends */}
         </div>
         {/* fields end */}
         <div className=" mt-8 px-2">
         <div className="font-bold">Account Information</div>
         <div className="flex justify-between mt-5 gap-3">
         <div className="text-base-content text-sm md:text-md">Member since</div>
         <div className="text-base-content text-sm md:text-md">{authUser.createdAt?new Date(authUser.createdAt).toLocaleDateString('en-GB'):<span className="loading loading-spinner"></span>}</div>
         </div>
         <hr className="border-gray-500 my-2"></hr>
         <div className="flex justify-between gap-3">
         <div className="text-base-content text-sm md:text-md">Account status</div>
         <div className="text-green-500 text-sm md:text-md font-semibold">Active</div>
         </div>
         </div>
      </div>   
      <div>
      </div>
    </div>
  );
};

export default ProfilePage;
