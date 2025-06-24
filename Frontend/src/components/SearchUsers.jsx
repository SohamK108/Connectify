import React from "react";
import { useState, useEffect, useRef } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
const SearchUsers = () => {
  const { setSearchOpen,getUsersFromSearch,isSearchOpen } = useMessageStore();
  const {theme}=useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropDownRef = useRef(null);
  const inputRef = useRef(null);
  const handleSearchBarChange=async(e)=>{
            const value = e.target.value;
            setSearchTerm(value);
            try
            {
                const data=await getUsersFromSearch(value);
                setSearchResults(data);
            }
            catch(error)
            {
                console.log("Error in fetching results : ",error)
                setSearchResults([]);
            }
          }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  if (isSearchOpen && inputRef.current) {
    inputRef.current.focus();
  }
}, [isSearchOpen]);

  return (
    <div>
      <div
        className={`absolute top-full mt-4 right-0 w-72 bg-base-100 shadow-lg rounded-lg z-50 p-3 max-lg:hidden ${theme=="light"?"border-gray-500 border-2":"border-gray-700 border-2"}`}
        ref={dropDownRef}
      >
        <input
        ref={inputRef}
        spellCheck="false"
        autoCapitalize="false"
        autoComplete="false"
          type="text"
          placeholder="Search by username..."
          className="p-1 rounded-lg px-2 outline-none border-1 focus:ring-0 w-full mb-2 border-gray-500 place-content-center text-center"
          value={searchTerm}
          onChange={(e)=>{handleSearchBarChange(e)}}
        />
        <div className="max-h-60 overflow-y-auto">
          {searchResults.length === 0 ? (
            <p className="text-sm text-gray-500 text-center"></p>
          ) : (
            searchResults.map((user) => (
                <>
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded "
                onClick={() => {
                  console.log("Send friend request to:", user._id);
                  setSearchOpen(false);
                }}
              >
                <img
                  src={user.profilePic}
                  className="w-8 h-8 rounded-full object-cover object-top"
                  alt={user.userName}
                />
                <span>@{user.userName}</span>
              </div>
              <hr className={` bg-gray-500 ${
            theme == "light" ? "border-gray-300" : "border-gray-500"
          }`}></hr></>
            )) 
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
