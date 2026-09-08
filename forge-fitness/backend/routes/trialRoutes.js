const express = require('express');
const {
  createTrial,
  getTrials,
  updateTrialStatus,
  deleteTrial,
} = require('../controllers/trialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', createTrial);
router.get('/', protect, getTrials);
router.put('/:id/status', protect, updateTrialStatus);
router.delete('/:id', protect, deleteTrial);

module.exports = router;
