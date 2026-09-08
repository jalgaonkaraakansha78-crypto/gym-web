const Contact = require('../models/Contact');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { isNonEmptyString, isValidEmail, isValidPhone } = require('../utils/validators');

// @route  POST /api/contact
// @access Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!isNonEmptyString(name)) {
    throw new ApiError(400, 'Name is required');
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, 'A valid email is required');
  }
  if (phone && !isValidPhone(phone)) {
    throw new ApiError(400, 'Invalid phone number');
  }
  if (!isNonEmptyString(message)) {
    throw new ApiError(400, 'Message is required');
  }

  const contact = await Contact.create({
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    message: message.trim(),
  });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contact,
  });
});

// @route  GET /api/contact
// @access Private (admin)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: contacts.length, data: contacts });
});

// @route  DELETE /api/contact/:id
// @access Private (admin)
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    throw new ApiError(404, 'Contact enquiry not found');
  }

  res.status(200).json({ success: true, message: 'Contact enquiry deleted' });
});

module.exports = { createContact, getContacts, deleteContact };
