/* jshint -W117, expr:true */
'use strict';

const expect  = require('chai').expect;
const mockery = require('mockery');
const sinon   = require('sinon');

describe('interpreter', () => {
  let Interpreter;
  const InterpreterSeekSpec = require('./interpreter.seek.spec');
  
  before(() => {
    mockery.registerAllowables([
      'assert',
      '../../src/interpreter',
      'events'
      ]);
    mockery.registerMock('./logger', {
      info: sinon.stub()
    });
    mockery.enable();
    Interpreter  = require('../../src/interpreter');
  });
  
  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });
  
  describe('interpret a welcome message', () => {
      it('matches a welcome message');
      it('extracts the username from the welcome message');
  });
  
  describe('interpret a seek message', () => {
      it('matches a seek message', function() {
          let interpreter = new Interpreter();
          let spec = new InterpreterSeekSpec();
          spec.assert(interpreter);
      });
      it('extracts the seeker username');
      it('extracts the seeker rating');
      it('extracts the seek game type');
      it('extracts the seek time control');
      it('extracts the seek color');
  });
  
  describe('interpret a game message', () => {
      
  });
  
  describe('interpret a chat message', () => {
      
  });
});