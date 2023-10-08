import Hand from './hand'
import Deck from './deck'

test('Create an empty hand', () => {
  const hand = new Hand()
  expect(hand.cards).toEqual([])
})

test('Create a hand from two initial cards', () => {
  const deck = new Deck()
  const card1 = deck.deck[51]
  const card2 = deck.deck[50]
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  expect(JSON.stringify(hand.cards)).toEqual(JSON.stringify([card1,card2]))
})

test('Create a dealer hand with one hidden card',() => {
  const deck = new Deck()
  deck.shuffle()
  const card1 = deck.dealCard()
  const card2 = deck.dealCard()
  card2.swapVisibility()
  const dealerHand = new Hand([card1,card2])
  expect(dealerHand.cards[0].visible).toBe(true)
  expect(dealerHand.cards[1].visible).toBe(false)
})

test('Empty hand via refresh', () => {
  const deck = new Deck()
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  expect(hand.cards.length).toEqual(2)
  hand.refresh()
  expect(hand.cards.length).toEqual(0)
})

test('Pickup 5 cards', () => {
  const deck = new Deck()
  const card1 = deck.deck[51]
  const card2 = deck.deck[50]
  const card3 = deck.deck[49]
  const card4 = deck.deck[48]
  const card5 = deck.deck[47]
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  hand.pickupCard(deck.dealCard())
  hand.pickupCard(deck.dealCard())
  hand.pickupCard(deck.dealCard())
  expect(hand.cards.length).toEqual(5)
  expect(JSON.stringify(card1)).toEqual(JSON.stringify(hand.cards[0]))
  expect(JSON.stringify(card2)).toEqual(JSON.stringify(hand.cards[1]))
  expect(JSON.stringify(card3)).toEqual(JSON.stringify(hand.cards[2]))
  expect(JSON.stringify(card4)).toEqual(JSON.stringify(hand.cards[3]))
  expect(JSON.stringify(card5)).toEqual(JSON.stringify(hand.cards[4]))
})

test('Check various hand scores', () => {
  const deck = new Deck()
  // Create a hand with an ace and king
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  expect(hand.scores().maxScore).toEqual(21)
  expect(hand.scores().minScore).toEqual(11)
  // Pickup a queen
  hand.pickupCard(deck.dealCard())
  expect(hand.scores().maxScore).toEqual(31)
  expect(hand.scores().minScore).toEqual(21)
  // Empty the hand and pickup a jack and 10
  hand.refresh()
  hand.pickupCard(deck.dealCard())
  hand.pickupCard(deck.dealCard())
  expect(hand.scores().maxScore).toEqual(20)
  expect(hand.scores().minScore).toEqual(20)
  // Empty the hand and pickup a 9, 6, and 4
  hand.refresh()
  hand.pickupCard(deck.dealCard())
  deck.dealCard()
  deck.dealCard()
  hand.pickupCard(deck.dealCard())
  deck.dealCard()
  hand.pickupCard(deck.dealCard())
  expect(hand.scores().maxScore).toEqual(19)
  expect(hand.scores().minScore).toEqual(19)
})

test('Check best valid scores', () => {
  const deck = new Deck()
  // Create a hand with an ace and king
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  expect(hand.scores().maxScore).toEqual(21)
  expect(hand.scores().minScore).toEqual(11)
  expect(hand.bestValidScore()).toEqual(21)
  // Pickup a further queen
  hand.pickupCard(deck.dealCard())
  expect(hand.scores().maxScore).toEqual(31)
  expect(hand.scores().minScore).toEqual(21)
  expect(hand.bestValidScore()).toEqual(21)
})

test('Check hand can be bust', () => {
  const deck = new Deck()
  // Create a hand with an ace and king
  const hand = new Hand([deck.dealCard(),deck.dealCard()])
  expect(hand.isBust()).toEqual(false)
  hand.pickupCard(deck.dealCard())
  expect(hand.isBust()).toEqual(false)
  hand.pickupCard(deck.dealCard())
  expect(hand.isBust()).toEqual(true)
  hand.refresh()
  expect(hand.cards.length).toBe(0)
  expect(hand.isBust()).toEqual(false)
})
