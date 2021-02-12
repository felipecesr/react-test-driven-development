import { render, screen } from '@testing-library/react'
import App from './App'

test('renders initial title', () => {
  render(<App />)
  const headingElement = screen.getByRole('heading', { name: /expenses/i })
  expect(headingElement).toBeInTheDocument()
})
