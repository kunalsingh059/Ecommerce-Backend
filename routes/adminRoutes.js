const express = require('express');
const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Get all users (Admin only)
router.get('/users', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make a user an admin (Admin only)
router.put('/make-admin/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User is now an admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
