import Deck from './models/deck'
import Hand from "./models/hand"
import './App.css'

function App() {
  
  const deck = new Deck()
  const playerHand = new Hand()
  const dealerHand = new Hand()

  function startGame() {
    document.getElementById('winner').innerHTML = ''
    document.getElementById('dealer-score').innerHTML = ''
    playerHand.refresh()
    dealerHand.refresh()
    deck.refresh()
    deck.shuffle()
    playerHand.pickupCard(deck.dealCard())
    dealerHand.pickupCard(deck.dealCard())
    playerHand.pickupCard(deck.dealCard())
    let hiddenCard = deck.dealCard()
    hiddenCard.swapVisibility()
    dealerHand.pickupCard(hiddenCard)
    renderDealerHand()
    renderPlayerHand()
    renderGameButtons()
    renderPlayerScore()
  }

  function renderCard(card) {
    return card.visible ?
      `<img src="/img/cards/${card.image}" alt="Card: ${card.face} of ${card.suit}" id="${card.face}_${card.suit}" />` :
      `<img key="${card.face}_${card.suit}" src="/img/cards/back_blue.png" alt="Dealer hole card" />`
  }

  function renderCards(cards) {
    return `<div class="hand">${cards.map((card) => renderCard(card)).join('')}</div>`
  }

  function renderDealerHand() {
    document.getElementById('App-dealer').innerHTML = renderCards(dealerHand.cards)
  }

  function renderPlayerHand() {
    document.getElementById('App-player').innerHTML = renderCards(playerHand.cards)
  }

  function renderGameButtons() {
    document.getElementById('game-buttons').hidden = false
    document.getElementById('start-game-button').hidden = true
  }

  function renderPlayerScore() {
    const score = playerHand.isBust() ? 'Bust!' : playerHand.bestValidScore()
    document.getElementById('player-score').innerHTML = `Your score: ${score}`
  }

  function renderDealerScore() {
    const score = dealerHand.isBust() ? 'Bust!' : dealerHand.bestValidScore()
    document.getElementById('dealer-score').innerHTML = `Dealer's score: ${score}`
  }

  function renderWinner() {
    const dealerScore = dealerHand.bestValidScore()
    const playerScore = playerHand.bestValidScore()
    document.getElementById('winner').innerHTML = dealerScore === playerScore ? 'Draw' : dealerScore > playerScore ? 'Dealer wins!' : 'You win!'
  }

  const handleDeal = () => {
    const newCard = deck.dealCard()
    playerHand.pickupCard(newCard)
    renderPlayerHand()
    renderPlayerScore()
    if (playerHand.isBust()) {
      document.getElementById('game-buttons').hidden = true
      document.getElementById('start-game-button').hidden = false
      renderWinner()
    } else if (playerHand.cards.length === 5) {
      handleStand()
    }
  }

  const handleStand = () => {
    document.getElementById('game-buttons').hidden = true
    dealerHand.cards[1].swapVisibility()
    while (!dealerHand.isBust() && dealerHand.cards.length < 5 && dealerHand.bestValidScore() < 17) {
      dealerHand.pickupCard(deck.dealCard())
    }
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
