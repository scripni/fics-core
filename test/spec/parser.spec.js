/* jshint -W117, expr:true */
'use strict';

var expect  = require('chai').expect;
var mockery = require('mockery');
var sinon   = require('sinon');

describe('parser', () => {
  var Parser;
    var interpreterMock;

  before(() => {
    mockery.registerAllowables([
      '../../src/parser',
      'assert',
      './logger'
      ]);
    mockery.registerMock('./interpreter', function() {
      return interpreterMock;
    });
    mockery.registerMock('./logger', {
      info: sinon.stub()
    });
    interpreterMock = {
      interpret: sinon.spy()
    };
    mockery.enable();

    Parser  = require('../../src/parser');
  });

  describe('breaking down a message based on separator', () => {
    it('identifies a single message if passed in one chunk', () => {
      var parser = new Parser('%x');
      parser.parse('message%x');
      expect(interpreterMock.interpret.calledWith('message')).to.be.true;
    });
    it('identifies a single message if passed in two chunks');
    it('identifies multiple messages in the same chunk');
    it('identifies multiple messages in multiple chunks');
  });


  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

});