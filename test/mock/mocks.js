'use strict';

var mockery = require('mockery');
var netMock = require('./net.mock');
var loggerMock = require('./logger.mock');
mockery.registerAllowables([
  '../../src/session'
  ]);

module.exports = {
  enable: function() {
    mockery.enable({ useCleanCache: true });
    mockery.resetCache();
  },
  disable: function() {
    mockery.disable();
  },
  net:  netMock,
  logger: loggerMock
};