const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
module.exports = (schema, property) => (req, res, next) => {
  let input;
  if (!property) input = req.body;
  else input = req[property];
  const { value, error } = schema.validate(input);
  if (error) {
    const { details } = error;
    const message = details
      .map((i) => i.message)
      .join(",")
      .split('"')
      .join("");
    throw new ApiError(httpStatus.BAD_REQUEST, message);
  } else {
    req.body = value;
    next();
  }
};
