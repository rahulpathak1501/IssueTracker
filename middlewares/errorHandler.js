//errorHandler.js

const handleError = (err, req, res, next) => {
  // Log the error
  console.error(err.stack);

  // Set appropriate status code and send error message
  res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = handleError;
