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
  const [winner, setWinner] = useState('')

  function startGame() {
    setPlayer('player')
    setPlayerHand([])
    setDealerHand([])
    let tempDeck = new Deck()
    tempDeck.shuffle()
    let hand1 = [tempDeck.dealCard()]
    let hand2 = [tempDeck.dealCard()]
    hand1 = [...hand1,tempDeck.dealCard()]
    hand2 = [...hand2,tempDeck.dealCard()]
    hand2[1].swapVisibility()
    setPlayerHand(playerHand => [...playerHand,...hand1])
    setDealerHand(dealerHand => [...dealerHand,...hand2])
    console.log('dealerHand',dealerHand)
    setDeck(tempDeck)
    setWinner('')
  }

  function bestValidScore(scores) {
    const validScores = Object.values(scores).filter(v => v < 22)
    return Math.max(...validScores,0)
  }

  useEffect(
    () => {
      setPlayerScores(playerScores => calcHandScores(playerHand))
      if (playerHand.length === 5) {
        setPlayer('dealer')
      }
    },
    [playerHand]
  )

  useEffect(
    () => {
      setDealerScores(dealerScores => calcHandScores(dealerHand))
      // if (player === 'dealer' && Math.max(Object.values(dealerScores).filter(v => v < 22)) < 17) {
      //   setDealerHand(dealerHand => [...dealerHand,deck.dealCard()])
      // }
    },
    [dealerHand]
  )

  useEffect(
    () => {
      console.log('playerScores',playerScores)
      if (playerScores.minScore > 21) {
        setWinner('Dealer')
      }
    },
    [playerScores]
  )

  useEffect(
    () => {
      console.log('dealerScores',dealerScores)
      if (dealerScores.minScore > 21) {
        setWinner('You')
      }
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

  // const handleDealerHands = () => {
  //   console.log('inside handleDealerHands()')
  //   if (bestValidScore(dealerScores) < 17) {
  //     console.log('min not reached...')
  //     setDealerHand(dealerHand => [...dealerHand,deck.dealCard()])
  //     console.log('recall handleDealerHands()')
  //     handleDealerHands()
  //   }
  //   (bestValidScore(dealerScores) > bestValidScore(playerScores)) ? setWinner('Dealer') : setWinner('You')
  // }

  const handleHold = () => {
    // setDealerHand(dealerHand => [dealerHand[0],{...dealerHand[1],hidden:false}])
    // console.log('card 2',dealerHand[1])
    const showHand = [...dealerHand]
    showHand[1].swapVisibility()
    setDealerHand(dealerHand => showHand)
    setPlayer('dealer')
    // handleDealerHands() 
  }

  const displayScores = (scoresState) => {
    if (scoresState.minScore !== scoresState.maxScore && scoresState.maxScore > 21)
      return scoresState.minScore
    let scores = `${scoresState.maxScore}`
    if (scoresState.minScore !== scoresState.maxScore) {
      scores += `(${scoresState.minScore})`
    }
    return scores
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
        {player === 'dealer' &&
          <div>Dealer's score: {displayScores(dealerScores)}</div>
        }
        <h1>
          Blackjack &#9824;
          {winner &&
            <span className="winner">{winner} wins!</span>
          }
        </h1>
        <div>
          {(!playerHand.length || winner) &&
            <button onClick={startGame}>Start game!</button>
          }
          {(playerHand.length > 0 && !winner) &&
            <span>
              {player !== 'dealer' &&
                <span>
                  <button onClick={handleDeal}>Hit</button>
                  <button onClick={handleHold}>Hold</button>
                </span>
              }
              <span className="score">Your score: {displayScores(playerScores)}</span>
            </span>
          }
        </div>
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
