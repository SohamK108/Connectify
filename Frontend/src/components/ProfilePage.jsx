import { User,Mail, AtSign,Camera, RefreshCcw} from "lucide-react";
import React from "react";
import { useState } from "react";
import "../index.css"
const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImagePreview(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

const ProfilePage = () => {

   const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    if (rotating) return; // Prevent multiple clicks while rotating
    setRotating(true);
    // Stop rotating after 1s (duration of animation)
    setTimeout(() => setRotating(false), 250);
    // Place your refresh logic here
  };
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      {/* profile box starts */}
      <div className="relative z-10 rounded-lg shadow-2xl p-8 mx-14 my-8 w-2/3 lg:w-1/3   bg-base-100">
        <div
          className={` text-base-content md:text-2xl text-md font-bold mb-3  rounded lg text-center`}
        >
          Profile
        </div>
        <div className="text-center mb-2">Your profile information</div>
        <div className="flex items-center justify-center relative">
          <div className="flex-col items-center justify-center">
          <img
            src="https://imgs.search.brave.com/olU1frCI_rKOD3-NBWDPcqTpdn8YDMNYb2wVQ2TmqlM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-base-300"
          />
          <div className="flex justify-between  mt-3  items-center">
            <label name="camera" className="cursor-pointer p-2 rounded-full bg-violet-500 hover:bg-violet-800">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Camera className=" text-base-content" />
            </label>
          <button className="cursor-pointer bg-violet-500 p-2 rounded-full hover:bg-violet-800" onClick={handleClick}><RefreshCcw className={`text-base-content transform transition-transform  ease-in-out ${
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
              Your username goes here...
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
              Your name goes here...
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
              Your email goes here...
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
         <div className=" p-10 px-6">
         <div className="font-bold">Account Information</div>
         <div className="flex justify-between mt-5">
         <div className="text-base-content">Member since</div>
         <div className="text-base-content">Random date</div>
         </div>
         <hr className="border-gray-500 my-2"></hr>
         <div className="flex justify-between">
         <div className="text-base-content lg:text-lg md:text-sm">Account status</div>
         <div className="text-green-500">Active</div>
         </div>
         </div>
      </div>   
      <div>
      </div>
    </div>
  );
};

export default ProfilePage;
