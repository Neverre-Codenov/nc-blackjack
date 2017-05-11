const cards  = require( './cards' );

class Player {
	constructor() {
        this.hand = [];
	}

	hitMe () {
		this.hand.push( cards.dealMeACard() );
	}

	// stand () {
	// 	console.log( "stand" );
	// }

	showCards () {
        return this.hand;
	}

}

module.exports = Player;

