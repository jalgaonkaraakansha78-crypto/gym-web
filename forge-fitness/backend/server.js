require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const programRoutes = require('./routes/programRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const trialRoutes = require('./routes/trialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
app.use(express.json());

// --- Health check ---
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Forge Fitness API is running' });
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Forge Fitness API listening on http://localhost:${PORT}`);
  });
});
