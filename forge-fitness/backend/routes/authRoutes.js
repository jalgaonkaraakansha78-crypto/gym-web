const express = require('express');
const {
  login,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
