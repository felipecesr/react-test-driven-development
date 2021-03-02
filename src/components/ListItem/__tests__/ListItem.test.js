import { render, screen } from '@testing-library/react'
import ListItem from '../ListItem'

test('renders a text, paid status and value', () => {
  render(<ListItem name='netflix' label='Netflix' value={45.9} />)
  expect(screen.getByLabelText(/netflix/i)).not.toBeChecked()
  expect(screen.getByText(/r\$ 45,90/i)).toBeInTheDocument()
})

test('renders another test, paid status and value', () => {
  render(<ListItem name='spotify' label='Spotify' value={16.9} isPaid />)
  expect(screen.getByLabelText(/spotify/i)).toBeChecked()
  expect(screen.getByText(/r\$ 16,90/i)).toBeInTheDocument()
})
