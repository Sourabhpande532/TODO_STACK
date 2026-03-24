const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "log.txt");

function logMessage(level, message) {
  const time = new Date().toISOString();
  const log = `[${level}] ${time} - ${message} \n`;
  fs.appendFile(filePath, log, (err) => {
    if (err) {
      console.log("Failed to write log:", err);
    }
  });
}
module.exports = logMessage;
