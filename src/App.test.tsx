import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Tic Tac Toe/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders game mode buttons', () => {
  render(<App />);
  const singlePlayerButton = screen.getByText(/Single Player \(vs AI\)/i);
  const multiplayerButton = screen.getByText(/Multiplayer \(2 Players\)/i);
  expect(singlePlayerButton).toBeInTheDocument();
  expect(multiplayerButton).toBeInTheDocument();
});
