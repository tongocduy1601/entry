require("dotenv").config();
const express = require("express");
const app = express();
const {
  errorHandler,
  routers,
  logger,
  ResponseWrapper,
} = require("./src/middlewares");
app.use(express.json());

routers(app);
logger(app);

app.use(errorHandler);
app.use(ResponseWrapper);

module.exports = app;
