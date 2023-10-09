/**
* @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders start game link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Start game!/i);
  expect(linkElement).toBeInTheDocument();
});
