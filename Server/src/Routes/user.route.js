import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getUserForSidebar } from "../Controllers/user.controller.js";

const router = express.Router();

router.get('/:token',protectedRoute,getUserForSidebar)
export default router;
