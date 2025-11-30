import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    groupName: String,
    groupIcon: String,
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;