const readline = require('readline');

const playerIFace = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `(^_^) hit ('h') or stand ('s') ? >` 
});


const doPlayerTurn = ( player, gamestate ) => {
	console.log( "\n________\nPlayer showing: " + gamestate.getTotal(player) + "\n\n" );
	playerIFace.prompt();
	playerIFace.on('line', (line) => {
	  switch(line.trim()) {
	      case 'h' :
	          player.hitMe();
	          console.log( player.showCards()[ player.showCards().length-1 ] );
              console.log( "________\nPlayer showing: " + gamestate.getTotal(player) + "\n" );
              // If at any point, the player’s hand total exceeds 21 they are bust.  
              // The round is over and the dealer wins
              if( gamestate.getTotal(player) > 21 ) {
              	  console.log("BUST!");
              	  gamestate.gameOver = true;
                  playerIFace.close();
	              break;
              } else {
                  playerIFace.prompt();
	              break;
              }
          case 's' :
              // If the player chooses to stick and their hand total is 21 or under, 
              // play passes to the dealer...
              console.log('Player stands.\n\n');
              playerIFace.close();
	          break;
	      default:
	          console.log(`Please enter 'h' or 's'`);
	          playerIFace.prompt();
	          break;
	  }
	}).on('close', () => {
		if(!gamestate.gameOver) {
			doDealerTurn(gamestate);
		}
    });
}

const doDealerTurn = ( gamestate ) => {
	// If the dealer’s second card is still hidden, show it now
	console.log( "--------  DEALER  ---------------" );
	gamestate.dealer.showCards().forEach( ( card ) => {
	    console.log( card );
    } );
    // The dealer can now either ‘Hit’ or ‘Stick’
    // I know, really dumb AI here... how often will (s)he win? 
    while( gamestate.getTotal( gamestate.dealer ) < gamestate.getTotal( gamestate.player ) ) {
      gamestate.dealer.hitMe();
      console.log( gamestate.dealer.showCards()[ gamestate.dealer.showCards().length-1 ] );
      console.log( "________\nDealer showing: " + gamestate.getTotal(gamestate.dealer) + "\n" );
    } 
    // ROUND IS OVER ...
    // If the dealer’s hand total exceeds 21 at any point they are bust.  
    // The round is over and the player wins.
    // If the dealer chooses to ‘Stick’ when their hand total is equal to 
    // the player’s, the round is over and a draw
    // If the dealer chooses to ‘Stick’ when their hand total is greater 
    // than the player’s, the round is over and the dealer wins
    const totals = { 
    	'dealer': gamestate.getTotal(gamestate.dealer), 
    	'player': gamestate.getTotal(gamestate.player)
    };

    if(totals['dealer'] > 21) {
    	console.log( "Dealer's BUST. Player wins" );
    } else if (totals['dealer'] === totals['player']) {
        console.log( "Draw!" );
    } else if (totals['dealer'] > totals['player']) {
        console.log( "Dealer wins" );
    }

    // TODO: Handle scoring and enable subsequent rounds...
}

const myCli = {};
myCli.doPlayerTurn = doPlayerTurn;

module.exports = myCli;