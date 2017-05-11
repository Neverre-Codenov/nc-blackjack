const assert = require( 'assert' );

/**
 * I am responsible for tracking game state and represent the
 * game model code ...
 * 
 */
 class GameState {
 	/**
 	 * player and dealer should be injected via c-tor
 	 */
 	constructor ( p, d ) {
 		this.gameOver = false;
 		this.player = p;
 		this.dealer = d;
 	}

 	/**
	 *  Put the game in its initial state (S0)...
	 */
 	initialize () {
 		this.dealer.init();
	    this.player.hitMe();
	    this.player.hitMe();
	    this.dealer.hitMe();
	    this.dealer.hitMe();
 	}

 	/**
 	 * Get caller the total in a given player's hand at current state...
     *
     * @param player . The player with a hand.
     *
     * @returns the total in the hand according to the rules of blackjack.
 	 */
 	getTotal (player) {
        return calcScore( player );
 	}

 }

module.exports = GameState;


/**
 *  'Private' helpers...
 */
function calcScore( p ) {
	var total = 0;
	var score = p.hand.reduce ( function(accumulator, card) {
        const value = (() => {
	        switch( card.face ) {
				case 'ace':
				    return (total <= 10) ? 11 : 1;
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
			    case '8':
			    case '9':
				case '10':
				    return parseInt(card.face);
				case 'jack':
				case 'queen':
				case 'king':
				    return 10;
			}
        })();
        total += value;
        return total;
	}, 0); 
    return total;
}


/**
 * Since I didn't have time to set up UT's ... [  ( ˃̣̣̥᷄⌓˂̣̣̥᷅ )  ]
 */
( () => {
    var p = {};
    // TEST 1
    p.hand = [ { suit: 'clubs', face: '5' },
               { suit: 'diamonds', face: '9' },
               { suit: 'hearts', face: '9' },
               { suit: 'spades', face: 'ace' } ];
    var result = calcScore( p );
    assert( result === 24);
    // TEST 2
    p.hand = [ { suit: 'clubs', face: '5' },
               { suit: 'spades', face: 'ace' } ];
    var result = calcScore( p );
    assert( result === 16);
} )();




