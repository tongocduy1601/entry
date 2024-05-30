require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const morgan = require("morgan");
const { createStream } = require("rotating-file-stream");
const path = require("path");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const accessLogStream = createStream("access.log", {
  size: "10M",
  interval: "1d", // rotate daily
  compress: "gzip",
  path: path.join(__dirname, "log"),
});
app.use(express.json());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
require("./middlewares/routes.mdw.js")(app);
app.use(function (err, req, res, next) {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
