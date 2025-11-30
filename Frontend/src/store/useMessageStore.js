import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';
import { io } from 'socket.io-client';


export const useMessageStore=create((set,get)=>({
    isChatSelected:false,
    chatSelected:null,
    selectedUser:null,
    isSearchOpen:false,
    isLoadingUserProfile:false,
    isAcceptingrequest:false,
    isRequesting:false,
    messages:[],
    isMessagesLoading:false,
    selectChat:(friendId)=>{
        set({chatSelected:friendId});
    },
    setSearchOpen:(val)=>{
        set({isSearchOpen:val});
    },
    fetchUserById:async(userId)=>{
      try {
        const res=await axiosInstance.get(`/friends/getUserById/${userId}`);   
        return res.data;
      } catch (error) {
        console.error("Error in fetchUserById function: ",error);
      }
    },
    getUserInformationByUserName:async(userName)=>{
      set({isLoadingUserProfile:true});
      try {
        const res=await axiosInstance.get(`/friends/getUserInformationByUserName/${userName}`);
        set({isLoadingUserProfile:false});
        return res.data;
      } catch (error) {
        console.error("Error in getUserInformationByUsername function: ",error);
        toast.error("Failed to fetch user");
        set({isLoadingUserProfile:false});
      }

    },getUsersFromSearch:async(userName)=>{
                    if (userName.trim()) {
                      try {
                        const res = await axiosInstance.get(`/friends/getUsersForFriendRequest?value=${userName}`);
                        return res.data;
                      } 
                      catch (err) {
                        console.error("Search failed,error in getUsersFromSearch: ", err);
                        toast.error("Failed to fetch users");
                      }
                    } else {
                      return [];
                    }
    },
    acceptRequest:async(fetchedUserId)=>{
      set({isAcceptingrequest:true});
      const setAuthUser=useAuthStore.getState().setAuthUser;
      const authUser=useAuthStore.getState().authUser;
      try {
        const res=await axiosInstance.put("/friends/acceptRequest",{fetchedUserId});
        toast.success("Request accepted!");
        set({isAcceptingrequest:false});
        if(authUser)
        {
         const updatedUser = {
            ...authUser,
            usersWhoHaveRequested: [...res.data.updatedAuthUser.usersWhoHaveRequested],
            userFriendRequests: [...res.data.updatedAuthUser.userFriendRequests],
            unseenNotifications: [...res.data.updatedAuthUser.unseenNotifications],
            seenNotifications: [...res.data.updatedAuthUser.seenNotifications],
            friends: [...res.data.updatedAuthUser.friends],
          };
          setAuthUser(updatedUser);
        }
      } catch (error) {
          console.log("Error in acceptRequest function:",error);
          toast.error("Failed to accept request");
          set({isAcceptingrequest:false});
      }
    },
    sendFriendRequest:async(fetchedUserId)=>{
      set({isRequesting:true});
      const setAuthUser=useAuthStore.getState().setAuthUser;
      const authUser=useAuthStore.getState().authUser;
      try {
        const res=await axiosInstance.put("/friends/sendFriendRequest",{fetchedUserId});
        toast.success("Request sent successfully!");
          set({isRequesting:false});
          setAuthUser(res.data.updatedAuthUser);
      } catch (error) {
        console.log("Error in sendFriendRequest function:",error);
        toast.error("Failed to send request");
        set({isRequesting:false});
      }
    },
    declineFriendRequest:async(fetchedUserId)=>{
      set({isRequesting:true}); 
      const setAuthUser=useAuthStore.getState().setAuthUser,authUser=useAuthStore.getState().authUser;
      try {
        const res=await axiosInstance.put("/friends/declineFriendRequest",{fetchedUserId});
        toast.success("Request declined.");
        set({isRequesting:false});
          const updatedUser = {
            ...authUser,
            usersWhoHaveRequested: [...res.data.updatedAuthUser.usersWhoHaveRequested],
            userFriendRequests: [...res.data.updatedAuthUser.userFriendRequests],
            unseenNotifications: [...res.data.updatedAuthUser.unseenNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            seenNotifications: [...res.data.updatedAuthUser.seenNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          };
          setAuthUser(updatedUser);
      } catch (error) {
        console.log("Error in declineFriendRequest function:",error);
        toast.error("Failed to decline request");
        set({isRequesting:false});
      } 
    },
    getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { chatSelected, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${chatSelected}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error in sendMessage action:", error);
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
     const { selectedUser } = get();
    if (!selectedUser) return;
    console.log(" subscribeToMessages fired. Selected user: ", selectedUser);
    const socket = useAuthStore.getState().socket;
     if (!socket) {
    return;
  }
  
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      console.log("Received newMessage via socket:", newMessage, "Is from selected user:", isMessageSentFromSelectedUser);
      if (!isMessageSentFromSelectedUser) return;
      const {messages}= get();
      set({
        messages: [...messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if(!socket) return;
    socket.off("newMessage");
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
}));