/* jshint node:true, -W117 */
'use strict';

var assert = require('assert');
var mocks = require('../mock/mocks');
mocks.net.register();
mocks.logger.register();
mocks.enable();

var Session = require('../../src/session');

describe('session', function() {
  describe('valid session', function() {
    var session = {};
    before(function() {
      session = new Session();
    });
    after(function() {
      mocks.disable();
    });

    it('connects to the correct host and signs in', function(done) {
      session.connect(function() {
        assert.equal(mocks.net.state.socket.connect.args[0].port, 5000);
        assert.equal(mocks.net.state.socket.connect.args[0].host, 'freechess.org');
        session.signIn(function() {
          assert.equal(mocks.net.state.socket.write.args[0], 'g\n\n\n\n\n\n\n\n\n\n');
          done();
        });
      });
    });
    it('passes received messages to the interpreter', function() {
    });
  });

  describe('disconnected session', function() {
    it('fails to sign in');
  });
});