import Deck from './models/deck'
import Hand from "./models/hand"
import './App.css'

// The main React app that is mounted into index.html via index.js
function App() {
  
  // Define an instance of the deck and two hands to play the game with
  const deck = new Deck()
  const playerHand = new Hand()
  const dealerHand = new Hand()

  // Starts a new game, clearing out any UI values from a previous game
  function startGame() {
    document.getElementById('winner').innerHTML = ''
    document.getElementById('dealer-score').innerHTML = ''
    // Clear out the player and dealer hands of any cards
    playerHand.refresh()
    dealerHand.refresh()
    // Reload the deck with all cards and shuffle the ordering
    deck.refresh()
    deck.shuffle()
    // Deal out initial cards to player and dealer hands
    playerHand.pickupCard(deck.dealCard())
    dealerHand.pickupCard(deck.dealCard())
    playerHand.pickupCard(deck.dealCard())
    // The final card to the dealer needs to be hidden
    let hiddenCard = deck.dealCard()
    hiddenCard.swapVisibility()
    dealerHand.pickupCard(hiddenCard)
    // Using HTML string literals approach here. Render the various parts of the UI to commence the game
    renderDealerHand()
    renderPlayerHand()
    renderGameButtons()
    renderPlayerScore()
  }

  function renderCard(card) {
    // Returns either the relevant card image, or an image of the back of a card (the dealer's hole card)
    return card.visible ?
      `<img src="/img/cards/${card.image}" alt="Card: ${card.face} of ${card.suit}" id="${card.face}_${card.suit}" />` :
      `<img key="${card.face}_${card.suit}" src="/img/cards/back_blue.png" alt="Dealer hole card" />`
  }


  function renderCards(cards) {
    // Returns a 'hand' div containing all the cards provided to the function for the given player/dealer's hand
    return `<div class="hand">${cards.map((card) => renderCard(card)).join('')}</div>`
  }

  function renderDealerHand() {
    // Renders the dealers cards in the dealer section of the UI (the top of the screen)
    document.getElementById('App-dealer').innerHTML = renderCards(dealerHand.cards)
  }

  function renderPlayerHand() {
    // Renders the players cards in the player section of the UI (the bottom of the screen)
    document.getElementById('App-player').innerHTML = renderCards(playerHand.cards)
  }

  function renderGameButtons() {
    // Show the 'hit' and 'stand' buttons, and hide the 'start game' button
    document.getElementById('game-buttons').hidden = false
    document.getElementById('start-game-button').hidden = true
  }

  function renderPlayerScore() {
    // Determine the player's score for display
    const score = playerHand.isBust() ? 'Bust!' : playerHand.bestValidScore()
    // Update the players score displayed in the UI
    document.getElementById('player-score').innerHTML = `Your score: ${score}`
  }

  function renderDealerScore() {
    // Determine the dealer's score for display
    const score = dealerHand.isBust() ? 'Bust!' : dealerHand.bestValidScore()
    // Update the dealers score displayed in the UI
    document.getElementById('dealer-score').innerHTML = `Dealer's score: ${score}`
  }

  function renderWinner() {
    // Calculate the best, non-bust score (or zero if bust)
    const dealerScore = dealerHand.bestValidScore()
    const playerScore = playerHand.bestValidScore()
    // Compare the two hand scores and output the winner, or a draw if both scores are equal
    document.getElementById('winner').innerHTML = dealerScore === playerScore ? 'Draw' : dealerScore > playerScore ? 'Dealer wins!' : 'You win!'
  }

  const handleDeal = () => {
    // Add top card from deck to players hand
    playerHand.pickupCard(deck.dealCard())
    // Refresh the players cards and score displayed in the UI
    renderPlayerHand()
    renderPlayerScore()
    if (playerHand.isBust()) {
      // If the player is bust, hide the 'hit' and 'stand' buttons,
      // show the 'start game' button again and render the winner information
      document.getElementById('game-buttons').hidden = true
      document.getElementById('start-game-button').hidden = false
      renderWinner()
    } else if (playerHand.cards.length === 5) {
      // If the player has reach the max card allowance of 5 and is still in the game,
      // switch to the dealer to play out the final steps of the round
      handleStand()
    }
  }

  const handleStand = () => {
    // Hide the 'hit' and 'stand' buttons as the players turn is now over
    document.getElementById('game-buttons').hidden = true
    dealerHand.cards[1].swapVisibility()
    // Draw a card for the dealer if they are not bust,
    // haven't reached the max 5 card limit,
    // and have a score of 16 or lower.
    while (!dealerHand.isBust() && dealerHand.cards.length < 5 && dealerHand.bestValidScore() < 17) {
      dealerHand.pickupCard(deck.dealCard())
    }
    // Once done, update their cards and score in the UI and render the winner information
    renderDealerHand()
    renderDealerScore()
    renderWinner()
    document.getElementById('start-game-button').hidden = false
  }

  return (
    <div className="App">
      <div id="App-dealer"></div>
      <div id="App-center">
        <div id="dealer-score"></div>
        <h1>Blackjack &#9824; <span id="winner"></span></h1>
        <div>
          <button id="start-game-button" onClick={startGame}>Start game!</button>
          <span id="game-buttons" hidden={true}>
            <button onClick={handleDeal}>Hit</button>
            <button onClick={handleStand}>Stand</button>
          </span>
          <span id="player-score" className="score"></span>
        </div>
      </div>
      <div id="App-player"></div>
    </div>
  );
}

export default App;
