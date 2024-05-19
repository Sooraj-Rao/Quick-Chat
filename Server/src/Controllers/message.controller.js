import { Conversation } from "../Model/conversation.model.js";
import { Message } from "../Model/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.query;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        lastMessage: message,
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = message;
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSocketId = getRecieverSocketId(receiverId);
    if (recieverSocketId) {
      //used to send message to specific client
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    return res
      .status(200)
      .json({ error: false, message: "success", data: newMessage });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Message Send Failed at Server" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { receiverId } = req.query;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    console.log(conversation);
    if (!conversation)
      return res
        .status(200)
        .json({ error: false, message: "No data", data: null });
    return res
      .status(200)
      .json({ error: false, message: "success", data: conversation });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Failed to get Messages at Server" });
  }
};
