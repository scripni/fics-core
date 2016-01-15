/* jshint -W117, expr:true */
'use strict';

var expect  = require('chai').expect,
    mockery = require('mockery'),
    sinon   = require('sinon');

describe('session', () => {
  describe('a valid session', () => {
    var socketConnectStub,
        Session,
        socketStub = {
          connect:  sinon.stub().callsArg(2),
          on:       sinon.stub(),
          write:    sinon.stub().callsArg(2)
        },
        interpreterStub = {
          interpret: sinon.stub()
        };

    before(function() {
      mockery.registerAllowables([
        '../../src/session',
        'assert'
        ]);
      mockery.registerMock('./logger', {
        info: sinon.stub()
      });
      mockery.registerMock('./interpreter', function() {
        return interpreterStub;
      });
      mockery.registerMock('net', {
        Socket: function() {
          return socketStub;
        }
      });

      mockery.enable();
      Session = require('../../src/session');
    });

    after(function() {
      mockery.disable();
      mockery.deregisterAll();
    });

    it('connects to the correct host and signs in', () => {
      var session = new Session();
      expect(socketStub.connect.called).to.be.false;
      session.connect(function() {
        expect(socketStub.connect.called).to.be.true;
        expect(socketStub.write.called).to.be.false;
        session.signIn(function() {
          expect(socketStub.write.called).to.be.true;
        });
      });
    });

    it('passes received messages to the interpreter', () => {
      var session = new Session();
      session.connect(() => {
        session.signIn(() => {
          socketStub.on.getCall(0).args[1]('fake message');
          expect(interpreterStub.interpret.called).to.be.true;
          expect(interpreterStub.interpret.calledWith('fake message'))
            .to.be.true;
        });
      });
    });
  });
});
