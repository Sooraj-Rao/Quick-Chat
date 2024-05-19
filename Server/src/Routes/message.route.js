import express from "express";
import { getMessage, sendMessage } from "../Controllers/message.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/send/:token", protectedRoute, sendMessage);
router.get("/get/:token", protectedRoute, getMessage);

export default router;
