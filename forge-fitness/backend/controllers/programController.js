const Program = require('../models/Program');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString } = require('../utils/validators');

// @route  GET /api/programs
// @access Public
const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find().sort({ createdAt: 1 });
  res.status(200).json({ success: true, count: programs.length, data: programs });
});

// @route  POST /api/programs
// @access Private (admin)
const createProgram = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  if (![name, description, image].every(isNonEmptyString)) {
    throw new ApiError(400, 'Name, description and image are required');
  }

  const program = await Program.create(req.body);
  res.status(201).json({ success: true, data: program });
});

// @route  PUT /api/programs/:id
// @access Private (admin)
const updateProgram = asyncHandler(async (req, res) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!program) {
    throw new ApiError(404, 'Program not found');
  }

  res.status(200).json({ success: true, data: program });
});

// @route  DELETE /api/programs/:id
// @access Private (admin)
const deleteProgram = asyncHandler(async (req, res) => {
  const program = await Program.findByIdAndDelete(req.params.id);

  if (!program) {
    throw new ApiError(404, 'Program not found');
  }

  res.status(200).json({ success: true, message: 'Program deleted' });
});

module.exports = { getPrograms, createProgram, updateProgram, deleteProgram };
