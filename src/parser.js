'use strict';

const assert      = require('assert');
const log         = require('./logger');
const Interpreter = require('./interpreter');

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
    let messageStart = 0;
    let messageEnd = this.data.indexOf(this.separator);
    // split by separator, pass messages to interpreter
    while (messageEnd >= 0) {
      let parsed = this.data.substring(messageStart, messageEnd);
      log.info(`found message of length ${parsed.length}`);
      this.interpreter.interpret(parsed.trim());
      // move cursor after separator
      messageStart = messageEnd + this.separator.length;
      messageEnd = this.data.indexOf(this.separator, messageStart);
    }

    // remove processed data
    const startOfRemaining = this.data.lastIndexOf(this.separator) + this.separator.length;
    if (startOfRemaining >= 0) {
      const remainingLength = this.data.length - startOfRemaining;
      if (remainingLength === 0) {
        this.data = '';
      } else {
        this.data = this.data.substring(startOfRemaining, remainingLength);
      }
    }
  }
}

module.exports = Parser;