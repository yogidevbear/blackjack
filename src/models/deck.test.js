import Deck from './deck'

test('Create two decks and check they are equal', () => {
  const deck1 = new Deck()
  const deck2 = new Deck()
  expect(JSON.stringify(deck1.deck)).toEqual(JSON.stringify(deck2.deck))
})

test('Shuffled deck differs from original deck', () => {
  const deck = new Deck()
  const unshuffled = JSON.stringify(deck.deck)
  deck.shuffle()
  expect(unshuffled).not.toEqual(JSON.stringify(deck.deck))
})

test('Refreshed deck is the same as original deck', () => {
  const deck = new Deck()
  const unshuffled = JSON.stringify(deck.deck)
  deck.shuffle()
  deck.refresh()
  expect(unshuffled).toEqual(JSON.stringify(deck.deck))
})

test('Deal first four cards from deck', () => {
  const deck = new Deck()
  const card1 = deck.deck[51]
  const card2 = deck.deck[50]
  const card3 = deck.deck[49]
  const card4 = deck.deck[48]
  expect(deck.deck.length).toEqual(52)
  expect(JSON.stringify(card1)).toEqual(JSON.stringify(deck.dealCard()))
  expect(deck.deck.length).toEqual(51)
  expect(JSON.stringify(card2)).toEqual(JSON.stringify(deck.dealCard()))
  expect(deck.deck.length).toEqual(50)
  expect(JSON.stringify(card3)).toEqual(JSON.stringify(deck.dealCard()))
  expect(deck.deck.length).toEqual(49)
  expect(JSON.stringify(card4)).toEqual(JSON.stringify(deck.dealCard()))
  expect(deck.deck.length).toEqual(48)
})

test('Swap visibility of a card dealt from the deck', () => {
  const deck = new Deck()
  const card = deck.dealCard()
  expect(card.visible).toBe(true)
  card.swapVisibility()
  expect(card.visible).toBe(false)
  card.swapVisibility()
  expect(card.visible).toBe(true)
})
