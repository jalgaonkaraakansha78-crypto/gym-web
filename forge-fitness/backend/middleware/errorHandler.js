// Catches any route that doesn't match — must be registered after all routes.
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Central error handler — must be registered last, with 4 arguments so
// Express recognizes it as an error middleware.
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';

  // Mongoose bad ObjectId (e.g. /api/trainers/not-a-real-id)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Duplicate key (e.g. an admin email that already exists)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} is already in use` : 'Duplicate value';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
