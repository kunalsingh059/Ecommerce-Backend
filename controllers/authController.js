require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// 🔹 User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// 🔹 Forgot Password (Without Hashing Reset Token)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000; 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
      });

      await user.save();
      res.json({ message: "Password reset link sent to email." });

    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(500).json({ message: "Failed to send reset email", error: emailError.message });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 Reset Password (Fixed Double Hashing)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("New Password Before Hashing:", newPassword);

    user.password = newPassword; // ✅ No need to hash, `User.js` handles it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    console.log("New Hashed Password (Stored in DB):", user.password);
    
    res.json({ message: "Password updated successfully." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
