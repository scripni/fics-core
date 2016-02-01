'use strict';

const EventEmitter = require('events');
              
const SeekRegex = /(\w+) \((\d+|\++)\) seeking (\d+) (\d+) (\w+) ([\w\/]+) (?:(?:\[(white|black)\] )?)(?:(m) )?\("play (\d+)/;

class Interpreter extends EventEmitter {
    constructor() {
        super();
    }
    
    interpret(msg) {
        let seek = SeekRegex.exec(msg);
        this.emit('seek', {
            from: {
                name: seek[1],
                rating: /\d+/.test(seek[2]) ? parseInt(seek[2]) : -1
            },
            game: {
                timeMin: parseInt(seek[3]),
                incrementSec: parseInt(seek[4]),
                rated: seek[5] === 'rated',
                style: seek[6],
                color: seek[7] || 'any'
            },
            id: parseInt(seek[9]),
            manual: seek[8] === 'm'
        });
    }
}

module.exports = Interpreter;