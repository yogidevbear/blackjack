// Need to import the Card class for constructing the deck
import Card from './card.js'

// Private variables used by the Deck class to create instances of card objects
const suits = ['hearts','spades','clubs','diamonds']
const faces = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]

// Private function to populate a deck array with cards, ordered by suit, then face value
const populateDeck = () => {
  // Initialise an empty deck array
  const deck = []
  // Loop over the suit and face arrays
  for (let suit of suits) {
    for (let face of faces) {
      // Initialise an empty score array for the current card iteration
      const score = []
      // Check the face array value to push the correct score integer into the score array object
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
      // Create a new card object using the Card class,
      // providing the relevant options for the current card iteration,
      // and push the resulting card object into the deck array
      deck.push(new Card({face:face,suit:suit,score:score}))
    }
  }
  // return the final deck array object
  return deck
}

// Class for creating a deck object
export default class Deck {
  // The constructor accepts no arguments
  constructor() {
    // Use the private populateDeck() function to set an array of card objects for the deck
    this.deck = populateDeck()
    this.refresh = refresh
    this.shuffle = shuffle
    this.dealCard = dealCard

    // Allows for re-populating the deck after each game
    function refresh() {
      this.deck = populateDeck()
    }

    // Shuffles the ordering of this.deck
    function shuffle() {
      // Using this.deck, define a counter for the loop logic below
      const { deck } = this
      let counter = deck.length
      // Define a variable for storing a random number
      let random

      // Loop over the deck array and swam the current index card object
      // with the card at the randomly calculated position
      while(counter) {
        random = Math.floor(Math.random() * counter--)
        // This is the array positional swap action:
        let temp = deck[random]
        deck[random] = deck[counter]
        deck[counter] = temp
      }

      return this
    }

    // Pops the last card object off the this.deck array.
    // Used as the argument to the Hand class's pickupCard() function
    function dealCard() {
      return this.deck.pop()
    }
  }
}