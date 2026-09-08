// Wraps an async route handler so any rejected promise / thrown error
// is forwarded to Express's error-handling middleware, instead of needing
// a try/catch block in every single controller function.
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
