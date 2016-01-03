/*jshint node:true*/
'use strict';

var net = require('net');
var log = require('./logger');
var ficsHost = process.env.FICS_HOST || 'freechess.org';
var ficsPort = process.env.FICS_PORT || 5000;

var Session = function() {
  var session = {};
  // opens a connection to the fics server
  session.connect = function(done) {
    var hasCallback = typeof done === 'function';
    if (!hasCallback) {
      log.warn('No callback specified calling connect');
    }

    var client = new net.Socket();

    client.connect(ficsPort, ficsHost, function() {
      log.info('client connected to ' + ficsHost + ':' + ficsPort);
      if (hasCallback) {
        done();
      }
    });
  };

  return session;
};

module.exports = Session;
