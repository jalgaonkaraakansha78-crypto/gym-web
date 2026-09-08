const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['admin'], default: 'admin' },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: true }
);

// Automatically hash the password whenever it's set or changed, so every
// place that creates/updates a user (seed script, change-password,
// reset-password) can just assign a plain-text password and save.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
