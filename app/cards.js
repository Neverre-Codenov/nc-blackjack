
const deck = new Array(52).fill(1).map( (v, i) => i+1 );

/**
 *  Shuffle the deck (using the Fisher-Yates algorithm).
 *  
 *  @param deck -- array of 52 with vals 1-52
 */
const shuffle = () => {	
    var i = 0, j = 0, temp = null;
    for (i = deck.length - 1; i > 0; i--  ) {
        j = Math.floor( Math.random() * (i+1) );
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
};

/**
 *  Simulate dealing a card...
 */
const dealMeACard = () => {
	const val = deck.pop();
	return getCard(val);
}

/**
 * Function that determines the card (composite of suit and face value)
 * given a deck of 52.
 *
 * @param value ~~ a number from 1 to 52
 * 
 * @returns a card object => { suit, face }
 */
const getCard = ( value ) => {
	const card = {};
	card.suit = (( value ) => {
        if( value < 14 ) {
            return 'spades';
        } else if( value >= 14 && value < 27 ) {
        	return 'clubs';
        } else if( value >= 27 && value < 40 ) {
        	return 'diamonds';
        } else {
            return 'hearts';
        }
	})(value);
	card.face = (( value ) => {
        const faceVal = value % 13;
        switch( faceVal ) {
			case 0: 
			    return "king";
			case 1:
			    return "ace";
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
		    case 8:
		    case 9:
			case 10:
			    return faceVal.toString();
			case 11:
			    return "jack";
			case 12:
			    return "queen";
			}
	})(value);
	return card;
}

/**
 * Define the public API
 */
const cards       = {};
cards.shuffle     = shuffle;
cards.dealMeACard = dealMeACard;
// sadly 'export' not yet implemented (node v7.7.1) so in interests of time...
module.exports = cards;

