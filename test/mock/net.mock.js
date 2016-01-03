/* jshint node:true */
'use strict';

var mockery = require('mockery');

var mock = {};

mock.register = function(connect) {
  var mockState = {
    connectArgs : [],
    onArgs : [],
    writeArgs : []
  };
  var netMock = {
    Socket : function() {
      var socket = {};
      socket.connect = function(port, host, done) {
        mockState.connectArgs.push({
          port: port,
          host: host,
          done: done
        });
        done();
      };
      socket.on = function(chan, done) {
        mockState.onArgs.push(chan);
      };
      socket.write = function(data, encoding, done) {
        mockState.writeArgs.push(data);
        done();
      };
      return socket;
    }
  };
  mockery.registerMock('net', netMock);

  return mockState;
};

module.exports = mock;