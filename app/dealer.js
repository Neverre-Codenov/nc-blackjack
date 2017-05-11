const cards = require('./cards');
const Player = require('./player'); 

class Dealer extends Player {

    init() {
		cards.shuffle();
	}

}

module.exports = Dealer;
