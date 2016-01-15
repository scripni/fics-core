'use strict';

var net         = require('net'),
    assert      = require('assert'),
    log         = require('./logger'),
    Interpreter = require('./interpreter'),
    ficsHost    = process.env.FICS_HOST || 'freechess.org',
    ficsPort    = process.env.FICS_PORT || 5000;

class Session {
  constructor() {
    this.client = new net.Socket();
    this.interpreter = new Interpreter();
  }

  // connects to FICS
  connect(done) {
    var self = this;
    assert.equal(typeof done, 'function');
    self.client.connect(ficsPort, ficsHost, function() {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
        done();
    });

    self.client.on('data', function(data) {
      self.interpreter.interpret(data);
    });

    self.client.on('close', function() {
      log.info('client closed');
    });
  }

  signIn(done) {
    var self = this;
    log.info('signing in as guest');
    // 2 newlines is enough when running 'telnet freechess.org 5000',
    // 10 seem to be required with this client... need to figure out why
    self.client.write('g\n\n\n\n\n\n\n\n\n\n', 'ASCII', done);
  }
}

module.exports = Session;
