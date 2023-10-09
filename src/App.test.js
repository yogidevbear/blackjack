/**
* @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders start game link', () => {
  render(<App />)
  // Is the start game button present
  const startGameButton = screen.getByText(/Start game!/i)
  expect(startGameButton).toBeInTheDocument()
})

test('starting game renders expected elements', () => {
  render(<App />)
  const startGameButton = screen.getByText(/Start game!/i)
  // start a new game
  startGameButton.click()
  // Are the hit and stand buttons present
  const hitButton = screen.getByText(/Hit/i)
  const standButton = screen.getByText(/Stand/i)
  expect(hitButton).toBeInTheDocument()
  expect(standButton).toBeInTheDocument()
  // Is there a hidden dealer hole card
  const holeCard = screen.getByAltText('Dealer hole card')
  expect(holeCard).toBeInTheDocument()
  // Are there three other face up cards
  const faceUpCards = screen.getAllByAltText(/Card: /i)
  expect(faceUpCards).toHaveLength(3)
})

test('Click the stand button flips the hole card', () => {
  render(<App />)
  const startGameButton = screen.getByText(/Start game!/i)
  // start a new game
  startGameButton.click()
  // Is the stand buttons present
  const standButton = screen.getByText(/Stand/i)
  // stand
  standButton.click()
  // Is there no hidden dealer hole card
  const holeCard = screen.queryByAltText('Dealer hole card')
  expect(holeCard).not.toBeInTheDocument()
})

test('Click the stand button plays out the dealers hand until a winner is found', () => {
  render(<App />)
  const startGameButton = screen.getByText(/Start game!/i)
  // start a new game
  startGameButton.click()
  // start button should be hidden now
  expect(startGameButton).not.toBeVisible()
  // Is the stand buttons present
  const standButton = screen.getByText(/Stand/i)
  // stand
  standButton.click()
  const winnerText = screen.queryByText(/win/i)
  expect(winnerText).toBeInTheDocument()
  // start button should be visible again
  expect(startGameButton).toBeVisible()
})
