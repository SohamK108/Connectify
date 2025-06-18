import User from "../Models/user.model.js";
export const getFriendsInformation=async(req,res)=>{
  try
  {
    const userId=req.user._id;
    const fetchedFriendIds=await User.findById(userId).populate("friends","fullName profilePic");
    console.log(fetchedFriendIds.friends);
    const fetchedFriendsdata=fetchedFriendIds.friends;
    return res.status(200).json([fetchedFriendsdata]);
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
};