import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState,useEffect } from "react";
const AuthImagePattern = ({title,subtitle}) => {
  const theme = useAuthStore((state) => state.theme);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleSquareGlow=(index)=>{
      setSelectedIndex(index);
      setTimeout(() => setSelectedIndex(null), 1000);
    }
    
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full`}>
    <div className="  lg:flex items-center justify-center ">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-5 justify-center" >
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
               onClick={()=>handleSquareGlow(index)}
              className={`w-28 aspect-square rounded-2xl  transition-all duration-200 ease-in-out transform 
  hover:bg-violet-500 
  hover:scale-105 
  hover:shadow-[0_0_30px_8px_rgba(124,58,237,0.4)] 
  ${index % 2 === 0 ? " animate-pulse" : ""}  ${theme=="light"?" bg-primary/40":" bg-primary/20"}${selectedIndex === index ?  " bg-violet-500 scale-105 shadow-[0_0_30px_8px_rgba(124,58,237,0.4)]" : ""}`}></div>
          ))}
        </div>
        
      </div>
    </div>
        <div className="text-center grid gap-2">
          <h2 className="  font-bold text-base-content text-2xl">{title}</h2>
          <p className="font-semibold text-base-content text-wrap mx-16">{subtitle}</p>
          </div>
    </div>
  );
};

export default AuthImagePattern;
