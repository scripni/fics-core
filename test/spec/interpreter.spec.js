/* jshint -W117, expr:true */
'use strict';

const expect  = require('chai').expect;
const mockery = require('mockery');
const sinon   = require('sinon');

describe('interpreter', () => {
  let Interpreter;
  
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
  
  describe('interpret a welcome message');
  describe('interpret a seek message');
  describe('interpret a game message');
  describe('interpret a chat message');
});