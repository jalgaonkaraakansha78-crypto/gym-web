const Trainer = require('../models/Trainer');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString } = require('../utils/validators');

// @route  GET /api/trainers
// @access Public
const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find().sort({ createdAt: 1 });
  res.status(200).json({ success: true, count: trainers.length, data: trainers });
});

// @route  GET /api/trainers/:id
// @access Public
const getTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  if (!trainer) {
    throw new ApiError(404, 'Trainer not found');
  }
  res.status(200).json({ success: true, data: trainer });
});

// @route  POST /api/trainers
// @access Private (admin)
const createTrainer = asyncHandler(async (req, res) => {
  const { name, specialization, experience, image } = req.body;

  if (![name, specialization, experience, image].every(isNonEmptyString)) {
    throw new ApiError(400, 'Name, specialization, experience and image are required');
  }

  const trainer = await Trainer.create(req.body);
  res.status(201).json({ success: true, data: trainer });
});

// @route  PUT /api/trainers/:id
// @access Private (admin)
const updateTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!trainer) {
    throw new ApiError(404, 'Trainer not found');
  }

  res.status(200).json({ success: true, data: trainer });
});

// @route  DELETE /api/trainers/:id
// @access Private (admin)
const deleteTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findByIdAndDelete(req.params.id);

  if (!trainer) {
    throw new ApiError(404, 'Trainer not found');
  }

  res.status(200).json({ success: true, message: 'Trainer deleted' });
});

module.exports = { getTrainers, getTrainer, createTrainer, updateTrainer, deleteTrainer };
