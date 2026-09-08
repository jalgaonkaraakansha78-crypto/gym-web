const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

// Protects a route: requires a valid "Bearer <token>" Authorization header.
// On success, attaches the logged-in admin to req.user.
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, 'Not authorized — no token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Not authorized — invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, 'Not authorized — user no longer exists');
  }

  req.user = user;
  next();
});

module.exports = { protect };
