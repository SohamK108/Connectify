import { User,Mail } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      {/* profile box starts */}
      <div className="relative z-10 rounded-lg shadow-2xl p-8 mx-14 mb-12 w-2/3 lg:w-1/3   bg-base-100">
        <div
          className={` text-base-content md:text-2xl text-md font-bold mb-3  rounded lg text-center`}
        >
          Profile
        </div>
        <div className="text-center mb-2">Your profile information</div>
        {/* fields start */}
        <div>
        <div className="mb-3">
        <div >Full name</div>
        <div>
          <div className="relative w-full border-base-content border-2 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              Your name goes here...
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <User />
            </div>
          </div>
        </div>
        </div>
        {/* first field ends */}
         <div className="mb-3">
           <div>Email</div>
        <div>
          <div className="relative w-full border-base-content border-2 p-2 rounded-lg">
            <div className="ml-10 truncate overflow-hidden">
              Your email goes here...
            </div>
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail />
            </div>
          </div>
        </div>
        </div>
         {/* second field ends */}
         </div>
         {/* fields end */}
      </div>
    </div>
  );
};

export default ProfilePage;
