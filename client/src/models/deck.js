import Card from './card.js'

export default class Deck {
  constructor() {
    this.deck = []
    this.shuffle = shuffle
    this.dealCard = dealCard

    function shuffle() {
      const { deck } = this
      let counter = deck.length
      let random

      while(counter) {
        random = Math.floor(Math.random() * counter--)
        let temp = deck[random]
        deck[random] = deck[counter]
        deck[counter] = temp
      }

      return this
    }

    const suits = ['hearts','spades','clubs','diamonds']
    const faces = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
    for (let suit of suits) {
      for (let face of faces) {
        const score = []
        switch (face) {
          case "ace":
            score.push(1)
            score.push(11)
            break
          case "king":
          case "queen":
          case "jack":
            score.push(10)
            break
          default:
            score.push(parseInt(face))
        }
        this.deck.push(new Card({face:face,suit:suit,score:score}))
      }
    }

    function dealCard() {
      const { deck } = this
      return deck.pop()
    }
  }
}