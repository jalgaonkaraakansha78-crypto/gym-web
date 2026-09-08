const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');
const { isNonEmptyString, isValidEmail } = require('../utils/validators');

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// @route  POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !isNonEmptyString(password)) {
    throw new ApiError(400, 'A valid email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.status(200).json({
    success: true,
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @route  GET /api/auth/me
// @access Private (admin)
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

// @route  PUT /api/auth/change-password
// @access Private (admin) — used from the dashboard when already logged in
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!isNonEmptyString(currentPassword) || !isNonEmptyString(newPassword)) {
    throw new ApiError(400, 'Current password and new password are required');
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, 'New password must be at least 6 characters');
  }

  const user = await User.findById(req.user._id).select('+password');
  const match = await user.comparePassword(currentPassword);
  if (!match) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword; // hashed automatically by the pre-save hook
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
});

// @route  POST /api/auth/forgot-password
// @access Public
// Generates a reset token and emails a reset link. Always responds with a
// generic success message, whether or not that email exists — this avoids
// leaking which emails have admin accounts.
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    throw new ApiError(400, 'A valid email is required');
  }

  const genericResponse = {
    success: true,
    message: 'If an account exists for that email, a reset link has been sent.',
  };

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(200).json(genericResponse);
  }

  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save({ validateBeforeSave: false });

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${clientUrl}/admin/reset-password?token=${rawToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Reset your Forge Fitness admin password',
    text: `You requested a password reset. Click this link to set a new password (valid for 30 minutes): ${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
  });

  res.status(200).json(genericResponse);
});

// @route  PUT /api/auth/reset-password/:token
// @access Public (token proves identity)
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!isNonEmptyString(password) || password.length < 6) {
    throw new ApiError(400, 'A new password of at least 6 characters is required');
  }

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+resetPasswordToken +resetPasswordExpire');

  if (!user) {
    throw new ApiError(400, 'That reset link is invalid or has expired');
  }

  user.password = password; // hashed automatically by the pre-save hook
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ success: true, message: 'Password reset successfully — you can now log in.' });
});

module.exports = { login, getMe, changePassword, forgotPassword, resetPassword };
