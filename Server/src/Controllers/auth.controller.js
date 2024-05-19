import { User } from "../Model/user.model.js";
import bcryptjs from "bcryptjs";
import { GenerateTokenAndSetCookie } from "../utils/generateToken.js";

export const SignUpUser = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res
        .status(200)
        .json({ error: true, message: "All fields mandatory" });
    }
    if (password !== confirmPassword) {
      return res
        .status(200)
        .json({ error: true, message: "Password doesn't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(200)
        .json({ error: true, message: "User already exist" });
    }

    const MaleImage = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const FemaleImage = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const image = gender == "male" ? MaleImage : FemaleImage;

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      image,
      gender,
      password: hashPassword,
    });
    if (newUser) {
      GenerateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        error: false,
        message: "Registration Successfull",
        user: {
          _id: newUser?._id,
          fullname: newUser?.fullname,
          username: newUser?.username,
          image: newUser?.image,
        },
      });
    } else {
      return res
        .status(200)
        .json({ error: true, message: "Invalid user Data" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Registration Failed at Server" });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(200)
        .json({ error: true, message: "All fields mandatory" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(200)
        .json({ error: true, message: "User Doesn't exist" });
    }
    const isPasswordValid = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordValid) {
      return res.status(200).json({ error: true, message: "Password Invalid" });
    }

    const token = GenerateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      error: false,
      message: "Login Successfull",
      token,
      user: {
        id: user?._id,
        fullname: user?.fullname,
        username: user?.username,
        image: user?.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ error: true, message: "Login Failed at Server" });
  }
};
