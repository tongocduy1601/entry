const httpStatus = require("http-status");
const { ApiError } = require("../utils");
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message = err.message || "SOMETHING BROKEN";
    return res.status(statusCode).json({
      error_message: message,
    });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error_message: err.message || "SOMETHING BROKEN",
  });
};

module.exports = { errorHandler };
