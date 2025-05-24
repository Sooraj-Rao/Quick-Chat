import mongoose from "mongoose";

const ConversationShcema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_users",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
        default: [],
      },
    ],
    lastMessage: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("conversations", ConversationShcema);
