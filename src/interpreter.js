'use strict';

var assert = require('assert');

class Interpreter {
  constructor(pattern) {
    this.pattern = pattern;
  }

  interpret(message) {
    var found = this.pattern.exec(message);
    if (found !== null) {
      this.lastCapture = found[0];
      return true;
    }

    return false;
  }
}

module.exports = Interpreter;