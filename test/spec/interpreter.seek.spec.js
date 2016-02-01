/* jshint -W117, expr:true */
'use strict';

/*

Usage: seek [time inc] [rated|unrated] [white|black] [crazyhouse] [suicide]
            [wild #] [auto|manual] [formula] [rating-range]

  The "seek" command allows to post an advertisement for a chess  game of the
  specified type.  The various parameters of the "seek" command are as follows:

     PARAMETER       COMMENTS
     ---------       --------
     time            minutes to start with for each player
     inc             seconds added to each clock per move
     rated/unrated   type of match; may be abbreviated by "r" and "u"
     white/black     designated colour you will have
     crazyhouse      may be abreviated by "zh"
     suicide         see "help suicide" if you are not familiar with this
                     chess variant
     wild #          wild chess variant, if any, such as wild 1, wild 2, wild 
                     fr, etc.; a shortcut for wild # is w#, but wild fr has no
                     shortcut [default: regular chess]
     auto/manual     indicates whether a game will start automatically when 
                     the ad is responded to, or if the person who placed the 
                     ad has the option to decline responses; may be 
                     abbreviated by "a" and "m" [default: auto start]
     formula         indicates whether your formula will used to screen 
                     responses to your ad; may be abbreviated by "f" [default:
                     formula is not checked]
     rating-range    indicates rating qualifications for the opponents, such 
                     as 1300-1800 [default: 0000-9999]

*/

const expect  = require('chai').expect;

const TestCases = [
    {
        in: 'CrnoBeliPera (1672) seeking 3 0 rated blitz ("play 99" to respond)\nfics%',
        out: {
            from: { name: "CrnoBeliPera", rating: 1672 },
            game: { timeMin: 3, incrementSec: 0, rated: true, style: 'blitz', color: 'any' },
            id: 99,
            manual: false
        }
    },
    {
        in: 'GuestABCD (++++) seeking 30 5 unrated standard ("play 5" to respond)\nfics%',
        out: {
            from: { name: "GuestABCD", rating: -1 },
            game: { timeMin: 30, incrementSec: 5, rated: false, style: 'standard', color: 'any' },
            id: 5,
            manual: false
        }
    },
    {
        in: 'GuestANDR (++++) seeking 1 1 unrated crazyhouse [white] m ("play 230" to respond)\nfics%',
        out: {
            from: { name: "GuestANDR", rating: -1 },
            game: { timeMin: 1, incrementSec: 1, rated: false, style: 'crazyhouse', color: 'white' },
            id: 230,
            manual: true
        }
    },
    {
        in: 'GuestANDR (++++) seeking 1 1 unrated suicide [black] m ("play 144" to respond)\nfics%',
        out: {
            from: { name: "GuestANDR", rating: -1 },
            game: { timeMin: 1, incrementSec: 1, rated: false, style: 'suicide', color: 'black' },
            id: 144,
            manual: true
        }
    },
    {
        in: 'GuestANDR (++++) seeking 2 3 unrated wild/1 m ("play 49" to respond)\nfics%',
        out: {
            from: { name: "GuestANDR", rating: -1 },
            game: { timeMin: 2, incrementSec: 3, rated: false, style: 'wild/1', color: 'any' },
            id: 49,
            manual: true
        }
    },
    {
        in: 'GuestANDR (++++) seeking 3 4 unrated wild/fr m ("play 38" to respond)\nfics%',
        out: {
            from: { name: "GuestANDR", rating: -1 },
            game: { timeMin: 3, incrementSec: 4, rated: false, style: 'wild/fr', color: 'any' },
            id: 38,
            manual: true
        }
    }
];

class InterpreterSeekSpec {
    assert(interpreter) {
        for (let i = 0; i < TestCases.length; i++) {
            this.assertTest(interpreter, TestCases[i]);
        }
    }
    
    assertTest(interpreter, test) {
        let seek = null;
        interpreter.on('seek', function(data) {
            seek = data;
        });

        interpreter.interpret(test.in);
        expect(seek.from.name).to.equal(test.out.from.name);
        expect(seek.from.rating).to.equal(test.out.from.rating);
        expect(seek.game.timeMin).to.equal(test.out.game.timeMin);
        expect(seek.game.incrementSec).to.equal(test.out.game.incrementSec);
        expect(seek.game.rated).to.equal(test.out.game.rated);
        expect(seek.game.style).to.equal(test.out.game.style);
        expect(seek.game.color).to.equal(test.out.game.color);
        expect(seek.id).to.equal(test.out.id);
        expect(seek.manual).to.equal(test.out.manual);
    }
}

module.exports = InterpreterSeekSpec;