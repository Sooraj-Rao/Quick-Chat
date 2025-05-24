import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./src/Routes/auth.route.js";
import messageRoutes from "./src/Routes/message.route.js";
import userRoutes from "./src/Routes/user.route.js";
import { connectDb } from "./src/Db/connectDb.js";
import { app, server } from "./src/socket/socket.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
connectDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  // res.redirect("https://srj-chatter-hub.vercel.app");
  res.send("ji");
});

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT} `);
});
