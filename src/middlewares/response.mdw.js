function ResponseWrapper(req, res, next) {
  res.sendResponse = function (statusCode, data, message) {
    return res.status(statusCode).json({ data, message });
  };
  next();
}

module.exports = ResponseWrapper;
