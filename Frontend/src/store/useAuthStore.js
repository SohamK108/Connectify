import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingin:false,
    isUpdatingProfile:false,
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
            set({authUser:res.data});
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
    setRandomAvatar:async ()=>{
        const {authUser,generateRandomString}=get();
            const randomString = generateRandomString();
            try{
               
            const avatarUrl = ` https://api.dicebear.com/9.x/avataaars/svg?seed=${randomString}`;
            console.log(avatarUrl);
            const res=await axiosInstance.put('/auth/updateProfilePhoto', {user:authUser,profilePic: avatarUrl });
            set({ authUser: res.data });
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

}));