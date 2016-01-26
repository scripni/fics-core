'use strict';

const net       = require('net');
const assert    = require('assert');
const log       = require('./logger');
const Parser    = require('./parser');
const ficsHost  = process.env.FICS_HOST || 'freechess.org';
const ficsPort  = process.env.FICS_PORT || 5000;

// Keeps a persistent TCP connection to freechess.org, and passes received
// data to a parser. 
class Session {
  constructor() {
    this.client = new net.Socket();
    this.parser = new Parser();
  }

  connect(done) {
    assert.equal(typeof done, 'function');
    this.client.connect(ficsPort, ficsHost, () => {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
        done();
    });

    // pass received data to parser
    this.client.on('data', data => {
      this.parser.parse(data);
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
