// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { authenticateJWT } = require('../middlewares/authMiddleware');
// const router = express.Router();
// const { forgotPassword, resetPassword } = require('../controllers/authController');

// // Forgot Password Route (Sends Email)
// router.post('/forgot-password', forgotPassword);

// // Reset Password Route (Uses Token from Email)
// router.post('/reset-password/:token', resetPassword);

// // Register Route
// router.post('/register', async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   try {
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = new User({ name, email: email.toLowerCase(), password });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user._id, isAdmin: user.isAdmin }, // Include isAdmin in token
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       isAdmin: user.isAdmin, // Send admin status to frontend
//     });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Protected Route (Requires Authentication)
// router.get('/protectedRoute', authenticateJWT, (req, res) => {
//   res.json({
//     message: 'You have access to this protected route!',
//     user: req.user,
//   });
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  forgotPassword,
  resetPassword,
  loginUser,
  registerUser,
} = require("../controllers/authController");

const router = express.Router();

// 🔹 Forgot Password Route (Sends Reset Link via Email)
router.post("/forgot-password", forgotPassword);

// 🔹 Reset Password Route (Receives Token in Body)
router.post("/reset-password", resetPassword); // Removed ":token"

// 🔹 Register Route
router.post("/register", registerUser);

// 🔹 Login Route
router.post("/login", loginUser);

// 🔹 Protected Route (Requires Authentication)
router.get("/protectedRoute", authenticateJWT, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

module.exports = router;
