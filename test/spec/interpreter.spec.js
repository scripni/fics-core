/* jshint -W117, expr:true */
'use strict';

var expect = require('chai').expect;

describe('interpreter', () => {
  describe(' a valid interpreter', () => {
    var Interpreter = require('../../src/interpreter');
    it('can match a regex with no capture groups', () => {
      var interpreter = new Interpreter(/match this/);
      expect(interpreter.interpret('match this')).to.be.true;
      expect(interpreter.lastCapture).to.equal('match this');
    });
  });
});