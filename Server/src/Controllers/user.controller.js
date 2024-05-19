import { User } from "../Model/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: userId } }).select('-password');
    return res
      .status(200)
      .json({ error: false, message: "success", data: allUsers });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Failed to Fetch users at Server" });
  }
};
