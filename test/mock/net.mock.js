/* jshint node:true */
'use strict';

var mockery = require('mockery');
mockery.registerAllowables([
  '../../src/session'
  ]);

var mocks = {};

mocks.enable = function() {
  mockery.enable({ useCleanCache: true });
  mockery.resetCache();
};

mocks.disable = function() {
  mockery.disable();
};

mocks.mockNet = function(connect) {
  var mockState = {}; 
  var netMock = {
    Socket : function() {
      var socket = {};
      socket.connect = function(port, host, done) {
        mockState.connectArgs = {
          port: port,
          host: host,
          done: done
        };
        done();
      };
      return socket;
    }
  };
  mockery.registerMock('net', netMock);

  return mockState;
};

mocks.mockLog = function() {
  var logMock = {
    info: function(msg) {
    }
  };
  mockery.registerMock('./logger', logMock);
};

module.exports = mocks;