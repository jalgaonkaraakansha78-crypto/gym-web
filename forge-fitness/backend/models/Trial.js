const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    preferredDate: { type: String, trim: true, default: '' },
    preferredTime: { type: String, trim: true, default: '' },
    program: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trial', trialSchema);
