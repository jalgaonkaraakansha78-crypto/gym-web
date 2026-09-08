const express = require('express');
const {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
} = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMemberships);
router.post('/', protect, createMembership);
router.put('/:id', protect, updateMembership);
router.delete('/:id', protect, deleteMembership);

module.exports = router;
