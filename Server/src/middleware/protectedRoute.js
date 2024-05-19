import jwt from "jsonwebtoken";
import { User } from "../Model/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res
        .status(200)
        .json({ error: true, message: "User Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(200)
        .json({ error: true, message: "User Unauthorized - Invalid Token" });
    }
    const userExist = await User.findById(decoded.userId).select("-password");

    if (!userExist) {
      return res.status(404).json({ error: true, message: "User Not Found" });
    }

    req.user = userExist;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Middleware Failed at Server" });
  }
};
