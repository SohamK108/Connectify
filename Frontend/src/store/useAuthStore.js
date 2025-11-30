import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { disconnect } from 'mongoose';
import { io } from 'socket.io-client';


export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingin:false,
    isUpdatingProfile:false,
    isFetchingFriends:false,
    theme:'light',
    socket:null,
    BACKEND_URL:'http://localhost:5000',
    onlineUsers:[],
    seenNotifications:[],
    unseenNotifications:[],

    checkAuth :async()=>{
        try {
            const res=await axiosInstance.get('/auth/checkAuth');
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in frontend checkAuth:",error);
            set({authUser:null});
        }
        finally{
        
            set({isCheckingAuth:false});
        }
    },
    signUp :async(data)=>{
        set({isSigningUp:true});
        try {
        const res=await axiosInstance.post("/auth/signup",data);  
        if(res)
        set({authUser:res.data}); 
        toast.success("Account created successfully!");
        get().connectSocket();
        } catch (error) {
            console.log("Error in frontend signUp:",error)
            toast.error(error.response.data.message);
        }
        finally
        {
        set({isSigningUp:false});
        }
    },
    setTheme: (theme) => set({ theme }),
    logout :async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully!");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.data.response.message);
        }
    },
    login:async(data)=>{
        set({isLoggingin:true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data.user});
            toast.success("Sign in successful!");
            get.connectSocket();
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }
        finally{
           
        set({isLoggingin:false});
        }
    },
    setAvatar:async (avatarUrl)=>{
        const {authUser}=get();
        try{
            const res=await axiosInstance.put('/auth/updateProfile', {user:authUser,URL: avatarUrl });
            set({ authUser: res.data });
            return res;
        }
        catch(error)
        {
            console.log("Error in setAvatar function in useAuthStore:",error);
            toast.error("Failed to set avatar.");
        }
    },
    handleProfileUpload:async(data)=>{
        set({isUpdatingProfile:true});
        try{
            const res=await axiosInstance.put("/auth/updateProfileByUpload",data);
            set({authUser:res.data});
            set({isUpdatingProfile:false});
            toast.success("Profile photo updated successfully!");
        }
        catch(error)
        {
            console.log("Error in handleProfileUpload:",error);
            toast.error("Failure in updating profile photo");
            set({isUpdatingProfile:true});
        }
    },
    setRandomAvatar:async ()=>{
        const {generateRandomString,setAvatar}=get();
            const randomString = generateRandomString();
            try{
            const avatarUrl = ` https://api.dicebear.com/9.x/avataaars/png?seed=${randomString}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9`;
            const res=await setAvatar(avatarUrl);
            }
            catch(error)
            {
                console.log("Error in setRandomAvatar:",error);
                toast.error("Failed to set random avatar.");
            }
        },
        generateRandomString:(length = 10)=>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
        },
        getFriendsInformation:async()=>{
            set({isFetchingFriends:true});
            try{
            const res=await axiosInstance.get("/friends/getFriendsInformation");
            if(res) set({isFetchingFriends:false});
            return res.data;
            }
            catch(error)
            {
                set({isFetchingFriends:false});
                console.log("Error in getFriendsInformation:",error);
                toast.error("Failed to fetch friends");
            }
        },
        setAuthUser:(updatedAuthUser)=>{
            set({authUser:updatedAuthUser});
        },
        connectSocket:()=>{
            const authUser=get().authUser;
            if(!authUser || get().socket?.connected) return;
            const socket=io(get().BACKEND_URL,{
                auth:{
                    userId:authUser._id
                },
            });
            socket.connect();
            set({socket:socket});
            socket.on("getOnlineUsers",(userIds)=>{
                set({onlineUsers:userIds});
            });
        },
        disconnectSocket:()=>{
            if(get().socket?.connected) {
                get().socket.disconnect();
                set({socket:null});
            }
        },
        subscribeToNotifications:()=>{
            const socket=get().socket;
            const {authUser}=get();
            if(!socket) return;
            socket.on("newNotification",(notification)=>{
                console.log("Received notification via socket:", notification);
                const {unseenNotifications}=get();
                set({
                    unseenNotifications:[notification,...unseenNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                });
                if (authUser) {
                set({

                authUser: {
                    ...authUser,
                    unseenNotifications: [notification, ...authUser.unseenNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                }
                });
            }
            });
        },
        unsubscribeFromNotifications:()=>{
            const socket=get().socket;
            if(!socket) return;
            socket.off("newNotification");
        },
        fetchNotifications:async()=>{
            const {authUser}=get();
            if(!authUser) return;
            try{
                set({
                    unseenNotifications:authUser.unseenNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                    seenNotifications:authUser.seenNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                });
            } catch(error)
            {
                console.log("Error in fetchNotifications function:",error);
            }       
        },
}));