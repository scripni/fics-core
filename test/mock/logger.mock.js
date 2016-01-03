'use strict';

var mockery = require('mockery');

var mock = {};
mock.register = function() {
  var logMock = {
    info: function(msg) {
    }
  };
  mockery.registerMock('./logger', logMock);
};

module.exports = mock;