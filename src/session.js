'use strict';

var net = require('net');
var assert = require('assert');
var log = require('./logger');
var ficsHost = process.env.FICS_HOST || 'freechess.org';
var ficsPort = process.env.FICS_PORT || 5000;

class Session {
  constructor() {
    this.client = new net.Socket();
  }

  // connects to FICS
  connect(done) {
    assert.equal(typeof done, 'function');
    this.client.connect(ficsPort, ficsHost, function() {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
        done();
    });

    this.client.on('data', function(data) {
      log.info('client sent ' + data);
    });

    this.client.on('close', function() {
      log.info('client closed');
    });
  }

  signIn(done) {
    log.info('signing in as guest');
    // 2 '\n' characters is enough when using telnet freechess.org:5000,
    // 10 seem to be required with this client... need to figure out why
    this.client.write('g\n\n\n\n\n\n\n\n\n\n', 'ASCII', done);
  }
}

module.exports = Session;
