import React from "react";
import { useState, useEffect, useRef } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom";
const SearchUsers = () => {
  const { setSearchOpen,getUsersFromSearch,isSearchOpen } = useMessageStore();
  const {theme}=useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm,setDebouncedSearchTerm]=useState("");
  const dropDownRef = useRef(null);
  const inputRef = useRef(null);

  const handleSearchBarChange=async()=>{
            try
            {
                const data=await getUsersFromSearch(debouncedSearchTerm);
                setSearchResults(data);
            }
            catch(error)
            {
                console.log("Error in fetching results : ",error)
                setSearchResults([]);
            }
          }

  useEffect(()=>{
    const timer=setTimeout(()=>{setDebouncedSearchTerm(searchTerm);},500);
    return ()=>{clearTimeout(timer);};
  },[searchTerm]);

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

useEffect(()=>{
  handleSearchBarChange();
},[debouncedSearchTerm]);

  return (
    <div>
      <div
        className={`absolute top-full mt-4 right-0  w-72 bg-base-100 shadow-xl rounded-lg z-50 pt-3 max-lg:hidden`}
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
          onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
        
        <div className="max-h-60 overflow-y-auto">
          {searchResults.length === 0 ? (
            <p className="text-sm text-gray-500 text-center"></p>
          ) : (
            searchResults.map((user) => (
                <>
                <Link to={`/profile/${user.userName}`}>
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-base-200 pl-4"
                onClick={() => {
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
              </Link>
              </>
            )) 
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
