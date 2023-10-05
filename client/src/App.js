import { useState } from "react";
import Deck from './models/deck'
import './App.css';



function App() {
  
  // let deck
  const [deck, setDeck] = useState()
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  // setPlayerHand(['quux'])

  function startGame() {
    setPlayerHand([])
    setDealerHand([])
    let tempDeck = new Deck()
    tempDeck.shuffle()
    let hand1 = [tempDeck.dealCard()]
    let hand2 = [tempDeck.dealCard()]
    hand1 = [...hand1,tempDeck.dealCard()]
    hand2 = [...hand2,tempDeck.dealCard()]
    // console.log('hand1',hand1,'hand2',hand2)
    setPlayerHand(playerHand => [...playerHand,...hand1])
    // console.log('playerHand',playerHand)
    setDealerHand(dealerHand => [...dealerHand,...hand2])
    // handleDeal()
    // console.log('??',playerHand)
    setDeck(tempDeck)
  }

  const handleDeal = () => {
    setPlayerHand(playerHand => [...playerHand,deck.dealCard()])
    // console.log(deck.deck.length)
    // console.log('playerHand',playerHand)
  }

  const handleHold = () => {
    alert("x")
  }

  return (
    <div className="App">
      <div id="App-dealer">
        {dealerHand.length > 0 &&
          <div className="hand">
            {/* {dealerHand.map((card,idx) => <img key={`${card.face}_${card.suit}`} src={`/img/cards/${card.image}`} alt={`${card.face} of ${card.suit}`} id={`${card.face}_${card.suit}`} />)} */}
            <img key={`${dealerHand[0].face}_${dealerHand[0].suit}`} src={`/img/cards/${dealerHand[0].image}`} alt={`${dealerHand[0].face} of ${dealerHand[0].suit}`} id={`${dealerHand[0].face}_${dealerHand[0].suit}`} />
            <img src="/img/cards/back_blue.png" alt="Dealer hole card" />
          </div>
        }
      </div>
      <div id="App-center">
        <h1>Blackjack &#9824;</h1>
        {!playerHand.length &&
          <button onClick={startGame}>Start game!</button>
        }
        {playerHand.length > 0 &&
          <div>
            <button onClick={handleDeal}>Hit</button>
            <button onClick={handleHold}>Hold</button>
          </div>
        }
      </div>
      <div id="App-player">
        {playerHand.length > 0 &&
          <div className="hand">
            {console.log('playerHand',playerHand)}
            {playerHand.map((card,idx) => <img key={`${card.face}_${card.suit}`} src={`/img/cards/${card.image}`} alt={`${card.face} of ${card.suit}`} id={`${card.face}_${card.suit}`} />)}
            {/* <img src={`/img/cards/${deck.deck[0].image}`} alt={`${deck.deck[0].face} of ${deck.deck[0].suit}`} id={`${deck.deck[0].face}_${deck.deck[0].suit}`} />
            <img src={`/img/cards/${deck.deck[2].image}`} alt={`${deck.deck[0].face} of ${deck.deck[0].suit}`} id={`${deck.deck[0].face}_${deck.deck[0].suit}`} />
            <img src={`/img/cards/${deck.deck[3].image}`} alt={`${deck.deck[0].face} of ${deck.deck[0].suit}`} id={`${deck.deck[0].face}_${deck.deck[0].suit}`} />
            <img src={`/img/cards/${deck.deck[4].image}`} alt={`${deck.deck[0].face} of ${deck.deck[0].suit}`} id={`${deck.deck[0].face}_${deck.deck[0].suit}`} />
            <img src={`/img/cards/${deck.deck[5].image}`} alt={`${deck.deck[0].face} of ${deck.deck[0].suit}`} id={`${deck.deck[0].face}_${deck.deck[0].suit}`} /> */}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
