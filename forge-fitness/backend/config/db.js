const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('Missing MONGO_URI in .env — cannot start without a database.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', mongoose.connection.host);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
