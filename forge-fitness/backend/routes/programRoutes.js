const express = require('express');
const {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPrograms);
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;
