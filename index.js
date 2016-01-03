/*jshint node:true*/
'use strict';

var Session = require('./src/session');
var log = require('./src/logger');

var session = new Session();
session.connect(function() {
  session.signIn(function() {
    console.log('signed in');
  });
});