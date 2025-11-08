import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, city } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      city,
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

//  UPDATE an existing user
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password, city } = req.body;
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (city !== undefined) user.city = city;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

//  READ all users for dashboard listing
export const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

// DELETE user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
