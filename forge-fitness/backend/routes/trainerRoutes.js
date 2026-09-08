const express = require('express');
const {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainer);
router.post('/', protect, createTrainer);
router.put('/:id', protect, updateTrainer);
router.delete('/:id', protect, deleteTrainer);

module.exports = router;
