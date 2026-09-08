const Trial = require('../models/Trial');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString, isValidPhone, isValidEmail } = require('../utils/validators');

// @route  POST /api/trials
// @access Public
const createTrial = asyncHandler(async (req, res) => {
  const { name, phone, email, preferredDate, preferredTime, program, message } = req.body;

  if (!isNonEmptyString(name)) {
    throw new ApiError(400, 'Name is required');
  }
  if (!isValidPhone(phone)) {
    throw new ApiError(400, 'A valid phone number is required');
  }
  if (email && !isValidEmail(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  const trial = await Trial.create({
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    preferredDate: preferredDate || '',
    preferredTime: preferredTime || '',
    program: program || '',
    message: message || '',
    status: 'new',
  });

  res.status(201).json({
    success: true,
    message: 'Free trial booked successfully',
    data: trial,
  });
});

// @route  GET /api/trials
// @access Private (admin)
const getTrials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const trials = await Trial.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: trials.length, data: trials });
});

// @route  PUT /api/trials/:id/status
// @access Private (admin)
const updateTrialStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['new', 'contacted', 'converted', 'cancelled'];

  if (!allowed.includes(status)) {
    throw new ApiError(400, `Status must be one of: ${allowed.join(', ')}`);
  }

  const trial = await Trial.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (!trial) {
    throw new ApiError(404, 'Trial enquiry not found');
  }

  res.status(200).json({ success: true, data: trial });
});

// @route  DELETE /api/trials/:id
// @access Private (admin)
const deleteTrial = asyncHandler(async (req, res) => {
  const trial = await Trial.findByIdAndDelete(req.params.id);

  if (!trial) {
    throw new ApiError(404, 'Trial enquiry not found');
  }

  res.status(200).json({ success: true, message: 'Trial enquiry deleted' });
});

module.exports = { createTrial, getTrials, updateTrialStatus, deleteTrial };
