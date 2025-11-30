import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import NotificationCard from "./NotificationCard";
import axios from "axios";
import { useMessageStore } from "../store/useMessageStore";

const NotificationBar = () => {
  const { checkAuth,authUser,unseenNotifications, seenNotifications,fetchNotifications,subscribeToNotifications,unsubscribeFromNotifications } = useAuthStore();

  useEffect(() => {
    checkAuth();
    fetchNotifications(); 
    subscribeToNotifications();

  return () => unsubscribeFromNotifications();
}, [fetchNotifications, subscribeToNotifications, unsubscribeFromNotifications]);
  
useEffect(() => {
  if (!authUser) return;

  fetchNotifications();
}, [authUser, fetchNotifications]);

// useEffect(() => {
//     console.log("Updated Notifications =>", {
//         unseen: unseenNotifications,
//         seen: seenNotifications
//     });
// }, [unseenNotifications, seenNotifications]);


  return (
    <div className="h-screen w-full flex justify-center py-7">
      <div className="w-5/6 xl:w-1/3 max-md:flex-col h-4/5">
        
        <div className="font-semibold text-3xl mb-8">Notification Center</div>
                   
                {
                unseenNotifications.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
          <div className="text-5xl mb-4">🔔</div>
          <p className="text-lg font-semibold">You're all caught up!</p>
          <p className="text-sm text-gray-400 mt-1">No new notifications right now.</p>
        </div>
      )}
        {unseenNotifications.length > 0  && (
          <>
          <div className="font-bold text-xl mb-2">Recent</div>
            {unseenNotifications.map((notif) => (
              <NotificationCard key={notif._id} notifData={notif} />
            ))}
          </>
        )}

        {seenNotifications.length > 0  && (
          <>
            <div className="font-bold text-xl mt-6">Earlier</div>
            {seenNotifications.map((notif) => (
              <NotificationCard key={notif._id} useSideBorder={false} notifData={notif}/>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default NotificationBar;
