const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../../logs/job-errors.log');

function logError(message) {
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, fullMessage);
  console.error(fullMessage);
}

module.exports = { logError };
