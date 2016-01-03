'use strict';

var net = require('net');
var log = require('./logger');
var ficsHost = process.env.FICS_HOST || 'freechess.org';
var ficsPort = process.env.FICS_PORT || 5000;

var Session = function() {
  var session = {};
  var client = new net.Socket();
  // opens a connection to the fics server
  session.connect = function(done) {
    var hasCallback = typeof done === 'function';
    if (!hasCallback) {
      log.warn('No callback specified calling connect');
    }

    client.connect(ficsPort, ficsHost, function() {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
      if (hasCallback) {
        done();
      }
    });

    client.on('data', function(data) {
      log.info('client sent ' + data);
    });

    client.on('close', function() {
      log.info('client closed');
    });
  };

  session.signIn = function(done) {
    log.info('signing in as guest');
    // 2 '\n' characters is enough when using telnet freechess.org:5000,
    // 10 seem to be required with this client... need to figure out why
    client.write('g\n\n\n\n\n\n\n\n\n\n', 'ASCII', done);
  };

  return session;
};

module.exports = Session;
