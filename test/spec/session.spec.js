/* jshint -W117, expr:true */
'use strict';

const expect  = require('chai').expect;
const mockery = require('mockery');
const sinon   = require('sinon');

describe('session', () => {
  describe('a valid session', () => {
    let socketConnectStub, Session;
    let socketStub = {
          connect:  sinon.stub().callsArg(2),
          on:       sinon.stub(),
          write:    sinon.stub().callsArg(2)
        };
    let parserStub = {
          parse: sinon.stub()
        };

    before(() => {
      mockery.registerAllowables([
        '../../src/session',
        'assert'
        ]);
      mockery.registerMock('./logger', {
        info: sinon.stub()
      });
      mockery.registerMock('./parser', function() {
        return parserStub;
      });
      mockery.registerMock('net', {
        Socket: function() {
          return socketStub;
        }
      });

      mockery.enable();
      Session = require('../../src/session');
    });

    after(() => {
      mockery.disable();
      mockery.deregisterAll();
    });

    it('connects to the correct host and signs in', () => {
      let session = new Session();
      expect(socketStub.connect.called).to.be.false;
      session.connect(() => {
        expect(socketStub.connect.called).to.be.true;
        expect(socketStub.write.called).to.be.false;
        session.signIn(() => {
          expect(socketStub.write.called).to.be.true;
        });
      });
    });

    it('passes received messages to the interpreter', () => {
      let session = new Session();
      session.connect(() => {
        session.signIn(() => {
          socketStub.on.getCall(0).args[1]('fake message');
          expect(parserStub.parse.called).to.be.true;
          expect(parserStub.parse.calledWith('fake message'))
            .to.be.true;
        });
      });
    });
  });
});
