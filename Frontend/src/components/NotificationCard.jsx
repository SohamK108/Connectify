import React, { useEffect,useState } from 'react'
import { useMessageStore } from '../store/useMessageStore';

const NotificationCard = ({useSideBorder=true,notifData}) => {
    const {fetchUserById,declineFriendRequest,acceptRequest}=useMessageStore();
    const [sender, setsender] = useState({});

    useEffect(() => {
      (async () => {
        const userData = await fetchUserById(notifData.from);
        setsender(userData);
      })(); 
    }, [notifData.from, fetchUserById]);

   function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

    
    return (
    <div className={`flex-col md:flex ${useSideBorder ? 'border-l-10 border-l-[#7C3AED]' : ''} w-full bg-base-300 rounded-xl py-2 px-2 mb-2`}>
            <div className='text-center flex justify-center items-center'>
                <div className={` w-full  flex items-center gap-2  container`}>
                    <div className='p-3 h-20 w-20 items-center flex '>
                        <img className="rounded-full object-cover" src={sender?.profilePic} alt="pfp"></img>
                    </div>
                    <div className='text-sm md:text-md'>
                        {notifData.message}
                    </div>        
                    <div className="text-gray-600 text-sm">{timeAgo(notifData.createdAt)}</div>
                </div>
            </div>
             <div className='flex w-full justify-evenly items-center gap-4 mb-1'>
                    <button className='bg-green-500 text-white  p-2 rounded-3xl cursor-pointer' onClick={() => acceptRequest(sender?._id)}>Accept</button>
                    <button className='bg-red-500 text-white p-2 rounded-3xl cursor-pointer' onClick={() => declineFriendRequest(sender?._id)}>Decline</button>
                </div>
                </div>
  )
}

export default NotificationCard