// const express = require('express');
// const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware');
// const User = require('../models/User');

// const router = express.Router();

// // ✅ Get all users (Admin only)
// router.get('/users', authenticateJWT, isAdmin, async (req, res) => {
//   try {
//     const users = await User.find({}, '-password'); // Exclude passwords
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ✅ Get a specific user (Admin only)
// router.get('/users/:id', authenticateJWT, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id, '-password'); // Exclude password
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ✅ Make a user an admin (Admin only)
// router.put('/make-admin/:id', authenticateJWT, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User is now an admin', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ✅ Remove admin privileges (Admin only)
// router.put('/remove-admin/:id', authenticateJWT, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: false }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User is no longer an admin', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ✅ Delete a user (Admin only)
// router.delete('/users/:id', authenticateJWT, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const { authenticateJWT, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserById,
  makeUserAdmin,
  removeAdminPrivileges,
  deleteUser
} = require("../controllers/adminController");

const router = express.Router();

// ✅ Get all users (Admin only)
router.get("/users", authenticateJWT, isAdmin, getAllUsers);

// ✅ Get a specific user (Admin only)
router.get("/users/:id", authenticateJWT, isAdmin, getUserById);

// ✅ Make a user an admin (Admin only)
router.put("/make-admin/:id", authenticateJWT, isAdmin, makeUserAdmin);

// ✅ Remove admin privileges (Admin only)
router.put("/remove-admin/:id", authenticateJWT, isAdmin, removeAdminPrivileges);

// ✅ Delete a user (Admin only)
router.delete("/users/:id", authenticateJWT, isAdmin, deleteUser);

module.exports = router;
