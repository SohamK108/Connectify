import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import { generateToken } from "../Lib/utils.js";
import cloudinary from "../Lib/cloudinary.js";
export const signup =async (req, res) => {
 try
 {
   const { fullName, email, password,userName} = req.body;
   if (!fullName || !email || !password||!userName) {
     return res.status(400).json({message:"All fields are required!"});
   }
   if(password.length<2)
   {
    return res.status(400).json({ message: "Password must contain atleast  2 characters" });
   }
   const user=await User.findOne({email});
   if(user)
   {
    return res.status(400).json({message:"User with this email already exists!"});
   }
   const user2 = await User.findOne({userName});
   if(user2)
   {
    return res.status(400).json({message:"User with this Username already exists!"});
   }
   let mustInclude = "";
for (let i = 97; i <= 122; i++) {
  mustInclude += String.fromCharCode(i); // a-z
}
for (let i = 48; i <= 57; i++) {
  mustInclude += String.fromCharCode(i); // 0-9
}
mustInclude += '._';
 const checkUserName = (mustInclude, userName) => {
  for (let k = 0; k < userName.length; k++) {
    if (!mustInclude.includes(userName[k])) return false;
  }
  return true;
};
   if(!checkUserName(mustInclude,userName))
   {
    return res.status(400).json({message:"Username cannot contain special characters except . and _"});
   }
   if(userName.length>10)
   {
    return res.status(400).json({message:"Username must not be greater than 10 characters!"});
   }
   if(userName[0]<'a'&&userName[0]>'z')
    return res.status(400).json({message:"Username must start with a lowercase alphabet!"});
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser=new User({email,fullName,password:hashedPassword,userName});
   console.log(newUser);
   if(newUser)
   {
    generateToken(newUser._id,res);
    await newUser.save();
    res.status(201).json({_id:newUser._id,
      fullName:newUser.fullName,
      userName:newUser.userName,
    email:newUser.email,
    profilePic:newUser.profilePic,
    });
   }
   else
   {
    res.status(400).json({message:"Invalid user data!"});
   }
 }
 catch(error)
 {
  console.log("Error in signup controller : ",error.message);
  res.status(500).json({message:"Internal server error!",error:error.message});
 }
  
};
export const login =async (req, res) => {
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email});
    if(!user)
    {
      return res.status(400).json({message:"Invalid credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect)
    {
      return res.status(400).json({ message: "Invalid credentials" });
    }
     generateToken(user._id,res);
     console.log(req.cookies.jwt);
    return res.status(200).json({
        id: user._id,
        userName:user.userName,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        createdAt:user.createdAt,
      });
  }catch(error)
  {
    console.log("Error in Login controller!",error.message);
    return res.status(500).json({message:"Internal server error!"});
  }
};
export const logout = (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0});
    return res.status(200).json({message:"Logout successful!"});
  }
  catch(error)
  {
    console.log("Error in Logout controller!", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
export const updateProfileByUpload=async (req,res)=>{
  try {
    const {profilePic}=req.body;
    const userId=req.user._id;
    if(!profilePic)
    {
      return res.status(400).json({message:"Profile pic is required!"});
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic);
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfileByUpload controller:",error);
    return res.status(500).json({message:"Internal server error"});
  }
}
export const checkAuth=async (req,res)=>{
  try{
    return res.status(200).json(req.user);
  }
  catch(error)
  {
    console.log("Error in checkAuth controller:",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}
export const updateProfile=async (req,res)=>{ 
  try {
    const {user,URL}=req.body;
    const userId=user._id;
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:URL},{new:true});
    if(!updatedUser)
    {
      return res.status(404).json({message:"Failed to update profile!"});
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller:",error);
    return res.status(500).json({message:"Internal server error"});
  }
}