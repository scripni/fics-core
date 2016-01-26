/* jshint -W117, expr:true */
'use strict';

var expect  = require('chai').expect;
var mockery = require('mockery');
var sinon   = require('sinon');

describe('parser', () => {
  var Parser, interpreterMock;

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
  });

  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('breaking down a message based on separator', () => {
    it('handles a message with no separator', () => {
      var parser = new Parser('%');
      parser.parse('message');
      expect(interpreterMock.interpret.called).to.be.false;
    });

    it('identifies a single message if passed in one chunk', () => {
      var parser = new Parser('%');
      parser.parse('message%');
      expect(interpreterMock.interpret.calledOnce).to.be.true;
      expect(interpreterMock.interpret.calledWith('message')).to.be.true;
    });

    it('identifies a single message if passed in two chunks', () => {
      var parser = new Parser('%');
      parser.parse('part 1');
      expect(interpreterMock.interpret.called).to.be.false;
      parser.parse(' part 2%');
      expect(interpreterMock.interpret.calledOnce).to.be.true;
      expect(interpreterMock.interpret.calledWith('part 1 part 2')).to.be.true;
    });

    it('identifies multiple messages in the same chunk', () => {
      var parser = new Parser('%');
      parser.parse('msg1%msg2%msg3');
      expect(interpreterMock.interpret.calledTwice).to.be.true;
      expect(interpreterMock.interpret.firstCall.calledWith('msg1')).to.be.true;
      expect(interpreterMock.interpret.secondCall.calledWith('msg2')).to.be.true;
    });

    it('identifies multiple messages in multiple chunks', () => {
      var parser = new Parser('%');
      expect(interpreterMock.interpret.called).to.be.false;
      parser.parse('msg');
      parser.parse('1%msg2%msg3');
      expect(interpreterMock.interpret.calledTwice).to.be.true;
      expect(interpreterMock.interpret.firstCall.calledWith('msg1')).to.be.true;
      expect(interpreterMock.interpret.secondCall.calledWith('msg2')).to.be.true;
    });

    it('can handle separator of length greater than one');
  });
});