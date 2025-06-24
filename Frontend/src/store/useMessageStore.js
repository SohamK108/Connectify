import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useMessageStore=create((set,get)=>({
    isChatSelected:false,
    chatSelected:null,
    isSearchOpen:false,
    selectChat:(friendId)=>{
        set({chatSelected:friendId});
    },
    setSearchOpen:(val)=>{
        set({isSearchOpen:val});
    },
    getUsersFromSearch:async(userName)=>{
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
}));