import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

export const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: ["https://srj-quickchat.vercel.app", "http://localhost:5173/"],
});

const userSocketMap = {};

export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const { userId } = socket.handshake.query;
  if (userId) userSocketMap[userId] = socket.id;

  //used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //used to listen to the events
  socket.on("disconnect", () => {
    console.log("User DisConnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server };
