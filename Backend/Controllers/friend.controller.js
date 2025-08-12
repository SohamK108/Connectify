import User from "../Models/user.model.js";
export const getFriendsInformation=async(req,res)=>{
  try
  {
    const userId=req.user._id;
    const fetchedFriendIds=await User.findById(userId).populate("friends","fullName profilePic");
    const fetchedFriendsdata=fetchedFriendIds.friends;
    console.log(fetchedFriendIds);
    return res.status(200).json(fetchedFriendsdata);
  }
  catch(error)
  {
    console.log("Error in getFriendsInformation controller:",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
} 
export const addFriend = async (req, res) => {
  const {  friendId } = req.body;
    const userId=req.user._id;
  try {
    // Prevent duplicates using $addToSet
    await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendId },
    });
    await User.findByIdAndUpdate(friendId, {
      $addToSet: { friends: userId },
    });
    
    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Error in addingFriend controller:", err);
    res.status(500).json({ message: "Internal server error" });
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