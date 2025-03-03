import { User } from "../modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
const registerUser = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if ([username, email, password, phone].some((field) => !field?.trim())) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPwd,
      phone,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    const finalUser = await User.findById(newUser.id).select("-password");

    return res.status(201).json({
      data: finalUser,
      isSuccess: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field?.trim())) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const finalUser = await User.findById(user.id).select("-password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRETIME,
    });

    return res.status(200).json({
      data: finalUser,
      isSuccess: true,
      token: token,
      message: "User logged in successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//
export { registerUser, loginUser };
