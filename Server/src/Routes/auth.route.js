import express from "express";
import {
  logInUser,
  SignUpUser,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/login", logInUser);
router.post("/signup", SignUpUser);

export default router;
