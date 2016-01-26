'use strict';

var assert      = require('assert');
var log         = require('./logger');
var Interpreter = require('./interpreter');

// Keeps a raw string of data and splits it into messages based on a predefined
// separator. Passes down messages to the interpterter.
class Parser {
  constructor(separator) {
    assert.ok(separator.length > 0);

    this.separator = separator;
    this.data = '';
    this.interpreter = new Interpreter();
  }

  parse(rawData) {
    log.info(`parsing raw data of length ${rawData.length}`);
    this.data += rawData;
    var messageStart = 0;
    var messageEnd = this.data.indexOf(this.separator);
    // split data by separator and pass each message to the interpreter
    while (messageEnd >= 0) {
      var parsed = this.data.substring(messageStart, messageEnd).trim();
      log.info(`found message of length ${parsed.length}`);
      this.interpreter.interpret(parsed);
      // move cursor after separator
      messageStart = messageEnd + this.separator.length;
      messageEnd = this.data.indexOf(this.separator, messageStart);
    }
  }
}

module.exports = Parser;