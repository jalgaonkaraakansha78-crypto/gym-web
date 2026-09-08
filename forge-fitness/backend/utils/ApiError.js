// A plain Error with an attached HTTP status code, so controllers can
// `throw new ApiError(404, 'Trainer not found')` and the central error
// handler will respond with the right status + message.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
