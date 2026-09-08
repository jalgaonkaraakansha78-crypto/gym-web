const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true, trim: true }, // e.g. "per month"
    features: { type: [String], default: [] },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Membership', membershipSchema);
