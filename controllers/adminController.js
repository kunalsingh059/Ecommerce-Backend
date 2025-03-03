const User = require("../models/User");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a specific user (Admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Make a user an admin (Admin only)
const makeUserAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User is now an admin", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove admin privileges (Admin only)
const removeAdminPrivileges = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: false }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User is no longer an admin", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  makeUserAdmin,
  removeAdminPrivileges,
  deleteUser,
};
