'use strict';

var mockery = require('mockery');

var mock = {
  // keep state for all mocked methods, e.g. state.socket.connect.args saves
  // arguments passed to socket.connect() calls
  state: {
    socket: {
      connect: {
        args: []
      },
      on: {
        args: []
      },
      write: {
        args: []
      }
    }
  },
  // register the mock
  register: function() {
    mockery.registerMock('net', {
      // mock net.Socket
      Socket : function() {
        var socket = {};
        // mock net.Socket.connect
        socket.connect = function(port, host, done) {
          // save args passed to connect
          mock.state.socket.connect.args.push({
            port: port,
            host: host
          });
          done();
        };

        // mock net.Socket.on
        socket.on = function(chan, callback) {
          // save args passed to on
          mock.state.socket.on.args.push(chan);
        };

        // mock net.Socket.write
        socket.write = function(data, encoding, done) {
          mock.state.socket.write.args.push(data);
          done();
        };
        return socket;
      }
    });
  }
};

module.exports = mock;