'use strict';

var winston = require('winston');
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
});

// export the winston logger instance
module.exports = logger;