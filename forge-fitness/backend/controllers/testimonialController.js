const Testimonial = require('../models/Testimonial');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString } = require('../utils/validators');

// @route  GET /api/testimonials
// @access Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
});

// @route  POST /api/testimonials
// @access Private (admin)
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, message, rating } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(message) || !(rating >= 1 && rating <= 5)) {
    throw new ApiError(400, 'Name, message and a rating between 1 and 5 are required');
  }

  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

// @route  PUT /api/testimonials/:id
// @access Private (admin)
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }

  res.status(200).json({ success: true, data: testimonial });
});

// @route  DELETE /api/testimonials/:id
// @access Private (admin)
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }

  res.status(200).json({ success: true, message: 'Testimonial deleted' });
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
