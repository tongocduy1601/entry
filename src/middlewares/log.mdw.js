const morgan = require("morgan");
const { createStream } = require("rotating-file-stream");
const path = require("path");
const rootPath = path.join(__dirname, "../../");

const accessLogStream = createStream("access.log", {
  size: "10M",
  interval: "1d", // rotate daily
  compress: "gzip",
  path: path.join(rootPath, "log"),
});

module.exports = (app) => {
  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );
};
