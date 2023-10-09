export default class Hand {
  constructor(cards=[]) {
    this.cards = cards
    this.refresh = refresh
    this.pickupCard = pickupCard
    this.scores = scores
    this.bestValidScore = bestValidScore
    this.isBust = isBust

    function refresh() {
      this.cards = []
    }

    function pickupCard(card) {
      this.cards.push(card)
    }

    function scores() {
      const scores = {
        minScore: 0,
        maxScore: 0
      }
      for (const {score} of this.cards) {
        scores.minScore += score[0]
        scores.maxScore += score.length > 1 ? score[1] : score[0]
      }
      return scores
    }

    function bestValidScore() {
      const validScores = Object.values(this.scores()).filter(v => v < 22)
      return Math.max(...validScores,0) // May introduce a bug with the zero
    }

    function isBust() {
      return this.cards.length > 0 && this.bestValidScore() === 0
    }
  }
}
