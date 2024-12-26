const winston = require("winston");
const expressWinston = require("express-winston");
const path = require("path");
const loggerNew = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: path.join(__dirname, "../../logs/errors.log"),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/app.log"),
    }),
  ],
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize(),
    winston.format.printf((log) => {
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    }),
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) {
    return false;
  },
});

module.exports = loggerNew;
