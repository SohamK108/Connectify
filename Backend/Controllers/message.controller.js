import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../Lib/cloudinary.js";
import {getSocketIdByUserId,io} from "../Lib/socket.js";
export const getMessages=async (req,res)=>
{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages = await Message.find({
          $or: [
            { senderId: userToChatId, receiverId: myId },
            { senderId: myId, receiverId: userToChatId },
          ],
        });
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller :", error.message);
        return res.status(500), json({ message: "Internal Server error!" });
    }
}
export const sendMessage=async(req,res)=>{
  try {
    const {text,image}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    let imageUrl;
    if(image)
    {
      const uploadResponse=await cloudinary.uploader.upload(image);
      imageUrl=uploadResponse.secure_url;
    }
    const newMessage=new Message({senderId,receiverId,text,image:imageUrl});
    await newMessage.save();

    //todo:socketio real time functionality
    const receiverSocketId = getSocketIdByUserId(receiverId);
    if (receiverSocketId) {
      console.log("Emitting newMessage to socket ID:", newMessage);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller",error);
    res.status(500).json({message:"Internal server error!"});
    
  }
}