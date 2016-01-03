/* jshint node:true */
'use strict';

var mockery = require('mockery');
var netMock = require('./net.mock');
var loggerMock = require('./logger.mock');
mockery.registerAllowables([
  '../../src/session'
  ]);

module.exports = {
  mockery: mockery,
  enable: function() {
    mockery.enable({ useCleanCache: true });
    mockery.resetCache();
  },
  disable: function() {
    mockery.disable();
  },
  net: {
    register: function() {
      return netMock.register();
    }
  },
  logger: {
    register: function() {
      loggerMock.register();
    }
  }
};