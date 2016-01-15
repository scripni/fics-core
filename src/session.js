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
    assert.equal(typeof done, 'function');
    this.client.connect(ficsPort, ficsHost, () => {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
        done();
    });

    this.client.on('data', data => {
      this.interpreter.interpret(data);
    });

    this.client.on('close', () => {
      log.info('client closed');
    });
  }

  signIn(done) {
    log.info('signing in as guest');
    // 2 newlines is enough when running 'telnet freechess.org 5000',
    // 10 seem to be required with this client... need to figure out why
    this.client.write('g\n\n\n\n\n\n\n\n\n\n', 'ASCII', done);
  }
}

module.exports = Session;
