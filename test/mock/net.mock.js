/* jshint node:true */
'use strict';

var mockery = require('mockery');
mockery.registerAllowables([
  '../../src/session'
  ]);

var lastConnectArgs = {};

var netMock = {
  Socket : function() {
    console.log('socket!!!');
    var socket = {};
    socket.connect = function(port, host, done) {
      lastConnectArgs = {
        port: port,
        host: host,
        done: done
      };
      console.log('alright');
      done();
    };
    return socket;
  }
};

var logMock = {
  info: function(msg) {
  }
};

mockery.registerMock('net', netMock);
mockery.registerMock('./logger', logMock);

module.exports = mockery;