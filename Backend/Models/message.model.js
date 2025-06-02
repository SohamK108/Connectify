import mongoose from "mongoose";
const messageSchema=mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},
{
    timestamps:true,
});
const Message=mongoose.model("Message",messageSchema);

export default Message;