import { render, screen, fireEvent } from '@testing-library/react'
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

test('calls the onChange function when checkbox is clicked', () => {
  const onChangeMock = jest.fn()
  render(
    <ListItem
      name='amazon'
      label='Amazon Prime'
      value={9.9}
      onChange={onChangeMock}
    />
  )

  const inputElement = screen.getByLabelText(/amazon prime/i)
  fireEvent.click(inputElement)

  expect(onChangeMock).toBeCalled()
})
