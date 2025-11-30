import { User,Mail, AtSign,Camera, RefreshCcw, CircleUserRound} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import "../index.css"
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useParams } from "react-router-dom";
import { useMessageStore} from "../store/useMessageStore";


 
const OtherUserProfilePage = () => {
    const {userName}=useParams();
    const {authUser,setAuthUser,checkAuth}=useAuthStore();
    const [fetchedUser,setFetchedUser]=useState({});
    const {getUserInformationByUserName,isLoadingUserProfile,acceptRequest,sendFriendRequest,isRequesting,isAcceptingRequest}=useMessageStore();
    const [friendStatus,setFriendStatus]=useState(-1);
    useEffect(()=>{
    const fetchUser = async () => {
    const reqUser = await getUserInformationByUserName(userName);
    setFetchedUser(reqUser);};
    fetchUser();
    },[userName,getUserInformationByUserName]);

    useEffect(() => {
     checkAuth();
    }, [])
    

      useEffect(()=>{
    if(fetchedUser)
    {
      if(authUser.userFriendRequests.includes(fetchedUser._id))
      {
        setFriendStatus(0);
      }
      else if(authUser.usersWhoHaveRequested.includes(fetchedUser._id))
      {
        setFriendStatus(1);
      }
      else if(authUser.friends.includes(fetchedUser._id))
      {
        setFriendStatus(2);
      }
      else
      {
        setFriendStatus(3);
      }
    }
  },[fetchedUser,authUser]);

  const handleStatusClick=async ()=>{
    if(friendStatus==0)
    {
      //Rollback the request-Remove authUser._id from fetchedUser's usersWhoHaveRequested array.Also remove the notification sent to fetchedUser
    }
    else if(friendStatus==1)
    {
      //Add the fetchedUser._id to friends array of authUser.Add the authUser._id to friends array of fetchedUser.Remove fetchedUser._id from usersWhoHaveRequested array of authUser.Remove authUser._id from userFriendRequests.
      await acceptRequest(fetchedUser._id);
      
    }
    else if(friendStatus==3)
    {
      //Add the fetchedUser._id to userFriendRequests array of authUser and add the authUser._id to fetcheduser's usersWhoHaveRequested.Also send notification to fetchedUser about acceptance/rejection.
      await sendFriendRequest(fetchedUser._id);
 
    }
  }
    if(isLoadingUserProfile||isRequesting||isAcceptingRequest)
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
    <div className="min-h-screen bg-base-200 flex justify-center items-center ">
      {/* profile box starts */}
      <div className="h-1/2 relative z-10 rounded-lg shadow-2xl p-8 pt-4 mx-14 my-2 w-2/3 lg:w-1/3  bg-base-100">
        <div
          className={` text-base-content md:text-2xl text-md font-bold  rounded lg text-center`}
        >
          Profile
        </div>
        <div className="text-center mb-2">Profile information</div>
        <div className="flex items-center justify-center relative">
          <div className="flex-col items-center justify-center min-w-36">
            <div className="flex justify-around gap-20 items-center">
          <img
            src={fetchedUser.profilePic}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover object-top border-4 border-base-300 "
          />
          </div>
          
          </div>
        </div>
        {/* fields start */}
        <div className="mb-3">
        <div className="mb-1" >Username</div>
        <div>
          <div className="relative w-full border-base-content border-1 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              {fetchedUser.userName}
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
              {fetchedUser.fullName}
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <User />
            </div>
          </div>
        </div>
        </div>
        {/* second field ends */}
         {/* <div className="mb-3">
           <div className="mb-1">Email</div>
        <div>
          <div className="relative w-full border-base-content border-1 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              {fetchedUser.email}
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail />
            </div>
          </div>
        </div>
        </div> */}
         {/* third field ends */}
         {friendStatus!=2 && <div className="flex justify-center items-center my-6 ">
           {friendStatus==1 && <button onClick={handleStatusClick} className="bg-green-600 text-white p-2 rounded-2xl px-4 cursor-pointer">Accept</button>}
            {friendStatus==0 && <button onClick={handleStatusClick} className="bg-gray-500 p-2 text-white rounded-2xl px-4 cursor-pointer">Requested</button>}
             { friendStatus==3 && <button onClick={handleStatusClick} className="bg-blue-600 p-2 text-white rounded-2xl px-4 cursor-pointer">Request</button>}
          </div>}
         </div>
         {/* fields end */}
         <div className=" mt-8 px-2">
         <div className="font-bold">Account Information</div>
         <div className="flex justify-between mt-5 gap-3">
         <div className="text-base-content text-sm md:text-md">Member since</div>
         <div className="text-base-content text-sm md:text-md">{fetchedUser.createdAt?new Date(fetchedUser.createdAt).toLocaleDateString('en-GB'):<span className="loading loading-spinner"></span>}</div>
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

export default OtherUserProfilePage;
