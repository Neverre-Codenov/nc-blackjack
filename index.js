
// const cards = require('./app/cards');
const Player    = require('./app/player');
const Dealer    = require('./app/dealer');
const myCli     = require('./app/my-cli')
const GameState = require('./app/gamestate');

const player    = new Player();
const dealer    = new Dealer();
const gamestate = new GameState(player, dealer);

// this can be expanded out to accomodate multiple non-dealer  
// players of players if more are ever added
const totals = { 'dealer':0, 'player':0 };

gamestate.initialize();


/////  YES THIS IS IN NEED OF REFACTOR BUT IT'S A START /////////////
// TODO:  FACTOR OUT THE REST OF THIS
totals['dealer'] = gamestate.getTotal( dealer );
totals['player'] = gamestate.getTotal( player );
// display S[0]
// The dealer receives two cards, the first face up, the second face down
// If the dealer’s first two cards equal 21, the second card is immediately revealed
console.log( "=================================" );
console.log( "--------  DEALER  ---------------" );
if(totals['dealer'] === 21) {
	dealer.showCards().forEach( ( card ) => {
		console.log( card );
	} );
} else {
	console.log( `{ suit: '****', face: '****' }` );
    console.log( dealer.showCards()[1] );
}
console.log( "--------  PLAYER  ---------------" );
player.showCards().forEach( ( card ) => {
	console.log( card );
} );

// Turn control over to myCLI for player interaction
myCli.doPlayerTurn( player, gamestate );

