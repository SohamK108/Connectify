import { useState, useEffect, useRef,useLayoutEffect } from "react";
import { ChevronLeft, MoreVertical, Send, Smile } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import Message from "../../../Backend/Models/message.model";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import ScrollToBottom from "react-scroll-to-bottom";


export default function ChatContainer() {
  const [input, setInput] = useState("");
    const {setSelectedUser,selectedUser,chatSelected,selectChat,messages,fetchUserById,isMessagesLoading,getMessages,subscribeToMessages,unsubscribeFromMessages}=useMessageStore();
  // Ref for the scrollable container
  const {authUser}=useAuthStore();
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
// useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// }, [messages]);


  // // Auto-scroll to bottom when messages change
  // useEffect(() => {
  //    const container = messagesContainerRef.current;
  // if (container) {
  //   container.scrollTo({
  //     top: container.scrollHeight,
  //     behavior: "smooth", // "auto" if you want instant scroll
  //   });
  // }
  // }, [messages]);

//   useLayoutEffect(() => {
//   const container = messagesContainerRef.current;
//   if (container) {
//     container.scrollTo({
//       top: container.scrollHeight,
//       behavior: "smooth",
//     });
//   }
// }, [messages]);

  useEffect(() => {
    if (!chatSelected) return;
    (async () => {
      const user = await fetchUserById(chatSelected);
      setSelectedUser(user);
    })();
  }, [chatSelected])




  useEffect(() => {
    subscribeToMessages();
    getMessages(chatSelected);
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);



  
      function formatMessageTime(date) {
        return new Date(date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

  return (
    // MAIN CONTAINER
    // h-full: Fills the 'h-full' parent from Homepage.
    // flex-col: Stacks Header, Messages, Input vertically.
    <div className="flex flex-col h-full w-full bg-base-200 border-l border-base-300">

      {/* 1. HEADER (Fixed Height) */}
      <div className="z-100 px-5 py-4 flex items-center gap-3 bg-base-100 border-b border-base-300 shrink-0">
        <ChevronLeft 
        size={30}
        className="cursor-pointer"
        onClick={() => selectChat(null)}
      />
         <div className="w-12 rounded-full">
            <img
          src={selectedUser?.profilePic}
          alt={selectedUser?.userName || "img"}
          className="rounded-full w-12 h-12 object-cover object-top "/>
        </div>
        <div className="font-semibold">{selectedUser ? selectedUser.fullName : "Chat Partner"}</div>
        <MoreVertical size={20} className="ml-auto cursor-pointer" />
      </div>

      {/* 2. MESSAGES AREA (Flexible Height & Scrollable) */}
      {/* flex-1: Takes ALL remaining space between Header and Input. */}
      {/* overflow-y-auto: Enables scrolling ONLY inside this div. */}
      {isMessagesLoading?<MessageSkeleton />:<ScrollToBottom className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messagesContainerRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col bg-violet-500 text-white">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        
      </ScrollToBottom >
      
      }
      
      {/* 3. INPUT AREA (Fixed Height) */}
      {/* shrink-0: Prevents it from being squashed. */}
      {/* Stays at the bottom because the Messages Area (flex-1) pushes it down. */}
      <MessageInput/>
    </div>
  );
}