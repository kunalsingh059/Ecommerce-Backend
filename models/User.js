const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    passwordChangedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

// 🔹 Fix: Prevent Double Hashing on Password Reset
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (!this.password.startsWith("$2a$")) { // Only hash if not already hashed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// 🔹 Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Fix OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
