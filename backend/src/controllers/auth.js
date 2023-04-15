import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect Credentials" });
    const token = jwt.sign(
      { email: existingUser.email, userId: existingUser._id },
      "salt",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { username: result.username, userId: result._id },
      "salt",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};