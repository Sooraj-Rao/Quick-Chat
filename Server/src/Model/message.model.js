import mongoose from "mongoose";

const messageShcema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("messages", messageShcema);
