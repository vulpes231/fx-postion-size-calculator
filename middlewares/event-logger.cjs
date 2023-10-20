const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { format: dateFormat } = require("date-fns");

function eventLogger(message, logname) {
  // Get the current date and time
  const currentTime = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");

  // Generate a unique ID
  const uniqueID = uuidv4();

  // Create the log item with date, unique ID, and message
  const logItem = `${currentTime}\t${uniqueID}\t${message}\n`;

  // Check if the 'logs' folder exists in the root directory
  const logsFolder = "logs";

  if (!fs.existsSync(logsFolder)) {
    // If the 'logs' folder doesn't exist, create it
    fs.mkdirSync(logsFolder);
  }

  // Create or append to the log file within the 'logs' folder
  const logFilePath = `${logsFolder}/${logname}.txt`;

  fs.appendFile(logFilePath, logItem, (err) => {
    if (err) {
      console.error(`Error writing to the log file: ${err}`);
    } else {
      console.log(`Event logged to ${logname}.log: ${logItem}`);
    }
  });
}

function requestLogger(req, res, next) {
  eventLogger(`${req.url}\t${req.method}`, "requests");
  next();
}

function errorLogger(err, req, res, next) {
  eventLogger(`${err.stack}`, "error");
  next();
}

module.exports = {
  requestLogger,
  errorLogger,
  eventLogger,
};
