// Class for creating a hand object
export default class Hand {
  // The constructor accepts one option argument:
  // - cards: an array of card objects
  // This optional cards array argument is used in the test suite to expedite test setup
  constructor(cards=[]) {
    this.cards = cards
    this.refresh = refresh
    this.pickupCard = pickupCard
    this.scores = scores
    this.bestValidScore = bestValidScore
    this.isBust = isBust

    // Clears out the this.cards array
    function refresh() {
      this.cards = []
    }

    // Pushes a card object onto the this.cards array
    // The card argument is usually supplied by the Deck class's dealCard function
    function pickupCard(card) {
      this.cards.push(card)
    }

    // Returns an object with the min and max score values, based on the cards in this.cards
    function scores() {
      // Initialise a score object with zero values for min and max
      const scores = {
        minScore: 0,
        maxScore: 0
      }
      // Loops of the score array of each card object
      for (const {score} of this.cards) {
        // Sum the minScore value with the first item (zero index) in the card score array
        // This will be present in all cases (2s through aces)
        scores.minScore += score[0]
        // Sum the maxScore value with either the second item (1st index) in the card score array
        // (only relevant where the card object is an ace - i.e. score = [1,11]),
        // or the first item (zero index) in the card score array (all other cards - 2s through kings)
        scores.maxScore += score.length > 1 ? score[1] : score[0]
      }
      // return the final hand scores object
      return scores
    }

    // Calculates the best scoring hand worth 21 or less.
    // Returns 0 if the hand is bust for both max and min score values.
    function bestValidScore() {
      // Filter down to all scores worth 21 or less
      const validScores = Object.values(this.scores()).filter(v => v < 22)
      // Return the max value (if found), otherwise return 0
      return Math.max(...validScores,0)
    }

    // Helper function to check if hand has cards and the min and max scores are both bust
    function isBust() {
      return this.cards.length > 0 && this.bestValidScore() === 0
    }
  }
}
