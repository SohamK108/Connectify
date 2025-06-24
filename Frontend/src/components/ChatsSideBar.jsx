import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Search } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import { useMessageStore } from "../store/useMessageStore";

const ChatsSideBar = () => {
  const { theme,authUser,getFriendsInformation,isFetchingFriends } = useAuthStore();
  const {selectChat,chatSelected}=useMessageStore();
  const [friendsInformation, setfriendsInformation] = useState([]);
  useEffect(() => {
    const fetchdata=async()=>{
   const data=await getFriendsInformation();
    setfriendsInformation(data);}
     fetchdata();
  }, []);
 
    if(isFetchingFriends)
    {
      return <>
      <div className={`h-full`}>
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-ring text-white w-24 h-24 "></span>
        </div>
      </div>
      </>
    }

  return (
    <div>
      {/* Centered fixed-width wrapper on small screens */}
      <div className={`w-full h-screen scrollbar-thin scrollbar-thumb-base-300 `} >
        <div className=" mb-6 text-2xl ml-4 font-bold">Chats</div>
        <div className="flex items-center mb-4 relative w-full md:pr-5">
          <input
            type="text"
            placeholder="Search chats"
            className={`text-center w-full outline-none ring-0 focus:ring-0  focus:outline-none focus:border-text-base-content focus:border-1 input input-bordered rounded-lg placeholder-gray-400 bg-base-100 text-base-content ${
              theme == "light" ? "border-gray-300" : "border-gray-500"
            }`}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-gray-400" />
          </div>
        </div>
        <hr
          className={` bg-gray-500 ${
            theme == "light" ? "border-gray-300" : "border-gray-500"
          }`}
        ></hr>
        {friendsInformation?.map((friend)=>(
          <>
        <div key={friend?._id} className={`overflow-y-auto max-h-[70vh]  py-2 hover:bg-base-300 cursor-pointer ${friend?._id==chatSelected?"bg-base-300":""}`} onClick={()=>{selectChat(friend?._id)}}>
          <div className="h-14 max-lg:h-16  flex items-center  gap-2">
            <div className="w-16 h-full flex items-center justify-center pl-2">
              <img src={friend?.profilePic} alt={friend?.userName||"img"} className="rounded-full w-12 h-12 object-cover object-top "></img>
            </div>
            <div className="flex-col w-full items-center justify-center px-4">
              <div className="font-semibold w-full text-sm sm:text-lg flex gap-2 justify-between items-center">
                <span >{friend?.fullName}</span>
                <span className="text-sm font-light">9:35</span>
              </div>
              <div className="text-sm">Message goes here...</div>
            </div>
          </div>
        </div>
        <hr
          className={` bg-gray-500 ${
            theme == "light" ? "border-gray-300" : "border-gray-500"
          }`}
        ></hr></>))}
      </div>
    </div>
  );
};

export default ChatsSideBar;
