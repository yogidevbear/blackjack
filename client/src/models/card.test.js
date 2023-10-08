import Card from './card'

test('Create three of diamonds card', () => {
  const card = new Card({suit:'diamonds',face:'three',score:[3]})
  expect(card.suit).toBe('diamonds')
  expect(card.face).toBe('three')
  expect(card.image).toBe('diamonds_three.png')
  expect(card.score.length).toBe(1)
  expect(card.score[0]).toBe(3)
  expect(card.visible).toBe(true)
})

test('Create queen of hearts card', () => {
  const card = new Card({suit:'hearts',face:'queen',score:[10]})
  expect(card.suit).toBe('hearts')
  expect(card.face).toBe('queen')
  expect(card.image).toBe('hearts_queen.png')
  expect(card.score.length).toBe(1)
  expect(card.score[0]).toBe(10)
  expect(card.visible).toBe(true)
})

test('Create ace of spades card', () => {
  const card = new Card({suit:'spades',face:'ace',score:[1,11]})
  expect(card.suit).toBe('spades')
  expect(card.face).toBe('ace')
  expect(card.image).toBe('spades_ace.png')
  expect(card.score.length).toBe(2)
  expect(card.score[0]).toBe(1)
  expect(card.score[1]).toBe(11)
  expect(card.visible).toBe(true)
})

test('Swap card visibility', () => {
  const card = new Card({suit:'clubs',face:'jack',score:[10]})
  expect(card.visible).toBe(true)
  card.swapVisibility()
  expect(card.visible).toBe(false)
  card.swapVisibility()
  expect(card.visible).toBe(true)
})
