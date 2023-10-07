import { useEffect, useState } from "react";
import Deck from './models/deck'
import './App.css';



function App() {
  
  const [deck, setDeck] = useState()
  const [player, setPlayer] = useState('player')
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [playerScores, setPlayerScores] = useState({})
  const [dealerScores, setDealerScores] = useState({})

  function startGame() {
    setPlayerHand([])
    setDealerHand([])
    let tempDeck = new Deck()
    tempDeck.shuffle()
    let hand1 = [tempDeck.dealCard()]
    let hand2 = [tempDeck.dealCard()]
    hand1 = [...hand1,tempDeck.dealCard()]
    hand2 = [...hand2,tempDeck.dealCard(true)]
    hand2[1].swapVisibility()
    setPlayerHand(playerHand => [...playerHand,...hand1])
    setDealerHand(dealerHand => [...dealerHand,...hand2])
    console.log('dealerHand',dealerHand)
    setDeck(tempDeck)
  }

  useEffect(
    () => setPlayerScores(playerScores => calcHandScores(playerHand)),
    [playerHand]
  )

  useEffect(
    () => setDealerScores(dealerScores => calcHandScores(dealerHand)),
    [dealerHand]
  )

  useEffect(
    () => {
      console.log('playerScores',playerScores)
    },
    [playerScores]
  )

  useEffect(
    () => {
      console.log('dealerScores',dealerScores)
    },
    [dealerScores]
  )

  useEffect(
    () => {
      if (player === 'dealer') {
        let playerFinalScore = Object.values(playerScores).filter(v => v < 22)
        console.log('playerFinalScore',playerFinalScore)
        console.log('Math.max([17,...playerFinalScore])',Math.max(17,...playerFinalScore))
        if (dealerScores.maxScore < Math.max(...playerFinalScore,17)) {
          setDealerHand(dealerHand => [...dealerHand,deck.dealCard()])
        }
      }
    },
    [player]
  )

  function calcHandScores(hand) {
    const scores = {
      minScore: 0,
      maxScore: 0
    }
    for (let {score} of hand) {
      scores.minScore += score[0]
      scores.maxScore += score.length > 1 ? score[1] : score[0]
    }
    return scores
  }

  const handleDeal = () => {
    setPlayerHand(playerHand => [...playerHand,deck.dealCard()])
  }

  const handleDealerHands = () => {
    if (dealerScores.maxScore < 17) {
      setDealerHand(dealerHand => [...dealerHand,deck.dealCard()])
    }
  }

  const handleHold = () => {
    // setDealerHand(dealerHand => [dealerHand[0],{...dealerHand[1],hidden:false}])
    // console.log('card 2',dealerHand[1])
    const showHand = [...dealerHand]
    showHand[1].swapVisibility()
    setDealerHand(dealerHand => showHand)
    setPlayer('dealer')
    // handleDealerHands() 
  }

  return (
    <div className="App">
      <div id="App-dealer">
        {dealerHand.length > 0 &&
          <div className="hand">
            {console.log('dealerHand',dealerHand)}
            {dealerHand.map((card,idx) => {
              if (card.visible) return (<img key={`${card.face}_${card.suit}`} src={`/img/cards/${card.image}`} alt={`${card.face} of ${card.suit}`} id={`${card.face}_${card.suit}`} />)
              return (<img key={`${card.face}_${card.suit}`} src="/img/cards/back_blue.png" alt="Dealer hole card" />)
            })}
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
            <p>Score: {playerScores.maxScore} {playerScores.minScore !== playerScores.maxScore && `(${playerScores.minScore})`}</p>
          </div>
        }
      </div>
      <div id="App-player">
        {playerHand.length > 0 &&
          <div className="hand">
            {console.log('playerHand',playerHand)}
            {playerHand.map((card,idx) => <img key={`${card.face}_${card.suit}`} src={`/img/cards/${card.image}`} alt={`${card.face} of ${card.suit}`} id={`${card.face}_${card.suit}`} />)}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
