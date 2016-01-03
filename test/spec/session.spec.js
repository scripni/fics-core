/* jshint node:true, -W117 */
'use strict';

var assert = require('assert');
var mockery = require('../mock/net.mock');
mockery.enable();

var Session = require('../../src/session');

describe('a valid session', function() {
  var session = {};
  before(function() {
    session = new Session();
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