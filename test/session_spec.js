/*jshint node:true*/
'use strict';

var assert = require('assert');

var mockery = require('mockery');
mockery.registerAllowables([
  '../src/session'
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

mockery.enable();


var Session = require('../src/session');

describe('a valid session', function() {

  var session = {};

  before(function() {
    var net = require('net');
    session = new Session();
    console.log('test set up');
  });
  after(function() {
    mockery.disable();
  });
  it('connects to the specified host', function(done) {
    session.connect(function() {
      console.log('test connected');
      done();
    });
  });
});