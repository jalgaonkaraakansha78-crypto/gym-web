const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true }, // e.g. "8 Years Experience"
    image: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
