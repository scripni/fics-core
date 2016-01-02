/*jshint node:true*/
'use strict';

var net = require('net');
var log = require('./logger');
var ficsHost = process.env.FICS_HOST || 'freechess.org';
var ficsPort = process.env.FICS_PORT || 5000;

var client = new net.Socket();
client.connect(ficsPort, ficsHost, function() {
  log.info('connected');
});