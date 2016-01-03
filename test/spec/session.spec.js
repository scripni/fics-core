/* jshint node:true, -W117 */
'use strict';

var assert = require('assert');
var mocks = require('../mock/net.mock');

var netMockState = mocks.mockNet();
mocks.mockLog();
mocks.enable();

var Session = require('../../src/session');

describe('a valid session', function() {
  var session = {};
  before(function() {
    session = new Session();
  });
  after(function() {
    mocks.disable();
  });
  it('connects to the correct host', function(done) {
    session.connect(function() {
      assert.equal(netMockState.connectArgs.port, 5000);
      assert.equal(netMockState.connectArgs.host, 'freechess.org');
      done();
    });
  });
});