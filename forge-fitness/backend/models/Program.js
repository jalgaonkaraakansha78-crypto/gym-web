const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'General' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Program', programSchema);
