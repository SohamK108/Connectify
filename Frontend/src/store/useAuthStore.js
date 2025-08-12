import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingin:false,
    isUpdatingProfile:false,
    isFetchingFriends:false,
    theme:'light',

    checkAuth :async()=>{
        try {
            const res=await axiosInstance.get('/auth/checkAuth');
            set({authUser:res.data});
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
        set({authUser:res.data}); 
        toast.success("Account created successfully!");
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
        addFriend:async(friend_id)=>{
            try{
                await axiosInstance.post("/friends/addFriend",{friendId:friend_id});
            }
            catch(error)
            {
                console.log("Error in addFriend :",error);
                toast.error("Error in adding friend");
            }
        },
}));