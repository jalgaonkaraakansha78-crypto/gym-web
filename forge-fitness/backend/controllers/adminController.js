const Trial = require('../models/Trial');
const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');

// @route  GET /api/admin/stats
// @access Private (admin)
// Only returns counts of data that actually exists in the database —
// there is no "members" collection yet, so total members is intentionally
// left out rather than invented.
const getStats = asyncHandler(async (req, res) => {
  const [totalTrials, newLeads, totalContacts] = await Promise.all([
    Trial.countDocuments(),
    Trial.countDocuments({ status: 'new' }),
    Contact.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: { totalTrials, newLeads, totalContacts },
  });
});

module.exports = { getStats };
