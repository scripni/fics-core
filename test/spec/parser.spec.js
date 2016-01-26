/* jshint -W117, expr:true */
'use strict';

const expect  = require('chai').expect;
const mockery = require('mockery');
const sinon   = require('sinon');

describe('parser', () => {
  let Parser, interpreterMock, interpretSpy;

  before(() => {
    mockery.registerAllowables([
      '../../src/parser',
      'assert'
      ]);
    mockery.registerMock('./interpreter', function() {
      return interpreterMock;
    });
    mockery.registerMock('./logger', {
      info: sinon.stub()
    });
    mockery.enable();
    Parser  = require('../../src/parser');
  });

  beforeEach(() => {
    interpreterMock = {
      interpret: sinon.spy()
    };
    interpretSpy = interpreterMock.interpret;
  });

  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('breaking down a message based on separator', () => {
    it('handles a message with no separator', () => {
      let parser = new Parser('%');
      parser.parse('message');
      expect(interpretSpy.called).to.be.false;
    });

    it('identifies a single message if passed in one chunk', () => {
      let parser = new Parser('%');
      parser.parse('msg%');
      expect(interpretSpy.calledOnce).to.be.true;
      expect(interpretSpy.firstCall.args[0]).to.equal('msg');
    });

    it('identifies a single message if passed in two chunks', () => {
      let parser = new Parser('%');
      parser.parse('p 1');
      expect(interpretSpy.called).to.be.false;
      parser.parse(' p 2%');
      expect(interpretSpy.calledOnce).to.be.true;
      expect(interpretSpy.firstCall.args[0]).to.equal('p 1 p 2');
    });

    it('identifies multiple messages in the same chunk', () => {
      let parser = new Parser('%');
      parser.parse('msg1%msg2%msg3');
      expect(interpretSpy.calledTwice).to.be.true;
      expect(interpretSpy.firstCall.args[0]).to.equal('msg1');
      expect(interpretSpy.secondCall.args[0]).to.equal('msg2');
    });

    it('identifies multiple messages in multiple chunks', () => {
      let parser = new Parser('%');
      expect(interpretSpy.called).to.be.false;
      parser.parse('msg');
      parser.parse('1%msg2%msg3');
      expect(interpretSpy.calledTwice).to.be.true;
      expect(interpretSpy.firstCall.args[0]).to.equal('msg1');
      expect(interpretSpy.secondCall.args[0]).to.equal('msg2');
    });

    it('can handle separator of length greater than one', () => {
      let parser = new Parser('fics%');
      parser.parse('Welcome to FICS!fics%');
      expect(interpretSpy.calledOnce).to.be.true;
      expect(interpretSpy.firstCall.args[0]).to.equal('Welcome to FICS!');
    });
  });

  describe('trimming whitespace', () => {
    it('trims whitespace before a message', () => {
      let parser = new Parser('%');
      parser.parse(' Hi!%');
      expect(interpretSpy.firstCall.args[0]).to.equal('Hi!');
    });

    it('trims whitespace after a message', () => {
      let parser = new Parser('%');
      parser.parse('Hi! %');
      expect(interpretSpy.firstCall.args[0]).to.equal('Hi!');
    });

    it('trims whitespace before and after a message', () => {
      let parser = new Parser('%');
      parser.parse(' Hi! %');
      expect(interpretSpy.firstCall.args[0]).to.equal('Hi!');
    });

    it('doesn`t trim whitespace inside a message if split into chunks', () => {
      let parser = new Parser('%');
      parser.parse('Hi ');
      parser.parse('there!%');
      expect(interpretSpy.firstCall.args[0]).to.equal('Hi there!');
    });

    it('doesn`t remove valid data when previous message is trimmed', () => {
        let parser = new Parser('%');
        parser.parse('Foo %');
        parser.parse('Bar%');
        expect(interpretSpy.secondCall.args[0]).to.equal('Bar');
    });

    it('clears inner data once message is parsed', () => {
      let parser = new Parser('%');
      parser.parse('Hi!%');
      expect(parser.data).to.be.empty;
    });
  });
});