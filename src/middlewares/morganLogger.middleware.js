const morgan = require("morgan");
const fs = require("fs");

const accessLogStream = fs.createWriteStream("./logs/access.log", {
  flags: "a",
});

const format =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';

const streams = {
  stream: accessLogStream,
};

const morganLogger = {
  production: morgan(format, streams),
  dev: morgan("dev"),
};

module.exports = morganLogger;
