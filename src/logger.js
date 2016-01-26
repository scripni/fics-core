'use strict';

const winston = require('winston');
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
});

// export the winston logger instance
module.exports = logger;