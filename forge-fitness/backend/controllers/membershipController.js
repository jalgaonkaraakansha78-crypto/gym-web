const Membership = require('../models/Membership');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString } = require('../utils/validators');

// @route  GET /api/memberships
// @access Public
const getMemberships = asyncHandler(async (req, res) => {
  const memberships = await Membership.find().sort({ price: 1 });
  res.status(200).json({ success: true, count: memberships.length, data: memberships });
});

// @route  POST /api/memberships
// @access Private (admin)
const createMembership = asyncHandler(async (req, res) => {
  const { name, price, duration } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(duration) || price === undefined || price < 0) {
    throw new ApiError(400, 'Name, duration and a valid price are required');
  }

  const membership = await Membership.create(req.body);
  res.status(201).json({ success: true, data: membership });
});

// @route  PUT /api/memberships/:id
// @access Private (admin)
const updateMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!membership) {
    throw new ApiError(404, 'Membership plan not found');
  }

  res.status(200).json({ success: true, data: membership });
});

// @route  DELETE /api/memberships/:id
// @access Private (admin)
const deleteMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findByIdAndDelete(req.params.id);

  if (!membership) {
    throw new ApiError(404, 'Membership plan not found');
  }

  res.status(200).json({ success: true, message: 'Membership plan deleted' });
});

module.exports = { getMemberships, createMembership, updateMembership, deleteMembership };
