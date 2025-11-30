import User from "../Models/user.model.js";
import mongoose from "mongoose";
import { getSocketIdByUserId,io} from "../Lib/socket.js";
export const getFriendsInformation=async(req,res)=>{
  try
  {
    const userId=req.user._id;
    const fetchedFriendIds=await User.findById(userId).populate("friends","fullName profilePic userName _id");
    const fetchedFriendsdata=fetchedFriendIds.friends;
    return res.status(200).json(fetchedFriendsdata);
  }
  catch(error)
  {
    console.log("Error in getFriendsInformation controller:",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
} 
export const acceptRequest=async(req,res)=>{
  
  try {
    const session = await mongoose.startSession();
   session.startTransaction();
    const {fetchedUserId}=req.body;
    const authUserId=req.user._id;
    const updatedFetchedUser=await User.findOneAndUpdate({_id:fetchedUserId},{
      $pull:{userFriendRequests:authUserId,
          usersWhoHaveRequested:authUserId,
        unseenNotifications: { from: authUserId, type: "FRIEND_REQUEST" },
        seenNotifications: { from: authUserId, type: "FRIEND_REQUEST" }
      },
      $push:{friends:authUserId}
    },{new:true,session}).select("-password");
    const updatedAuthUser=await User.findOneAndUpdate({_id:authUserId},{
    $pull:{usersWhoHaveRequested:fetchedUserId,
      userFriendRequests:fetchedUserId,
      unseenNotifications: { from: fetchedUserId, type: "FRIEND_REQUEST" },
      seenNotifications: { from: fetchedUserId, type: "FRIEND_REQUEST" }
    },
    $push:{friends:fetchedUserId}
    },{new:true,session}).select("usersWhoHaveRequested userFriendRequests unseenNotifications seenNotifications friends");
    await session.commitTransaction();
    session.endSession();
  return res.status(200).json({updatedAuthUser});
  } catch (error) {
    console.log("Error in acceptRequest API controller: ",error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const sendFriendRequest=async(req,res)=>{
  try {
     const session = await mongoose.startSession();
   session.startTransaction();
    const {fetchedUserId}=req.body;
    const authUserId=req.user._id;
    const updatedAuthUser=await User.findOneAndUpdate({_id:authUserId},{
    $push:{userFriendRequests:fetchedUserId}
    },{new:true,session}).select("-password");
    
    const updatedFetchedUser=await User.findOneAndUpdate({_id:fetchedUserId},{
      $push:{
        usersWhoHaveRequested: authUserId,
        unseenNotifications:{
        type:"FRIEND_REQUEST",
        from:authUserId,
        message:`${updatedAuthUser.fullName} (@${updatedAuthUser.userName}) sent you a friend request`,
      }}
    },{new:true,session}).select("-password");

    await session.commitTransaction();
    session.endSession();

    const socketId = getSocketIdByUserId(fetchedUserId);
    if (socketId) {
      io.to(socketId).emit("newNotification",{
        type:"FRIEND_REQUEST",
        from:authUserId,
        message:`${updatedAuthUser.fullName} (@${updatedAuthUser.userName}) sent you a friend request`,
        createdAt: new Date().toISOString() 
      });
    }
  return res.status(200).json({updatedAuthUser});
    
  } catch (error) {
    console.log("Error in sendFriendRequest API controller:",error);
      return res.status(500).json({message:"Internal server error"});
  }
}

export  const getUserInformationByUserName=async(req,res)=>{
    try
    {
      const {userName}=req.params;
      const requiredUser=await User.findOne({userName}).select("-password -friends -usersWhoHaveRequested -userFriendRequests");
      return res.status(200).json(requiredUser);
    }
    catch(error)
    {
      console.log("Error in getUserInformationByUserName API controller:",error);
      return res.status(500).json({message:"Internal server error"});
    }
}

export const getUsersForFriendRequest=async(req,res)=>{
    try {
    const { value } = req.query;
    const currentUserId = req.user._id;
    if (!value || value.trim() === "") {
      return res.status(400).json({ message: "Query string is required" });
    }
    const currentUser = await User.findById(currentUserId).select("friends");
    const searchRegex = new RegExp(value, "i");
    const users = await User.find({
      _id: { $nin: [...currentUser.friends, currentUserId] },
      $or: [
        { userName: { $regex: searchRegex } },
        { fullName: { $regex: searchRegex } },
      ],
    }).select("_id userName fullName profilePic");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForFriendRequest controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const declineFriendRequest=async(req,res)=>{
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const {fetchedUserId}=req.body;
        const authUserId=req.user._id;
        const updatedFetchedUser=await User.findOneAndUpdate
        ({_id:fetchedUserId},{
          $pull:{userFriendRequests:authUserId,
            unseenNotifications: { from: authUserId, type: "FRIEND_REQUEST" },
            seenNotifications: { from: authUserId, type: "FRIEND_REQUEST" }
          }
        },{new:true,session}).select("-password");
        const updatedAuthUser=await User.findOneAndUpdate
        ({_id:authUserId},{
        $pull:{usersWhoHaveRequested:fetchedUserId,
          unseenNotifications: { from: fetchedUserId, type: "FRIEND_REQUEST" },
          seenNotifications: { from: fetchedUserId, type: "FRIEND_REQUEST" }
        }
        },{new:true,session}).select("usersWhoHaveRequested userFriendRequests unseenNotifications seenNotifications");
        await session.commitTransaction();
        session.endSession();

      return res.status(200).json({updatedAuthUser});
    } catch (error) {
      console.log("Error in declineFriendRequest API controller: ",error);
      res.status(500).json({message:"Internal server error"});
    }
  }; 
  export const getUserById=async(req,res)=>{
    try {
      const {userId}=req.params;
      const user=await User.findById(userId).select("profilePic userName fullName _id");
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error in getUserById controller:",error);
      return res.status(500).json({message:"Internal server error"});
    }
  };
