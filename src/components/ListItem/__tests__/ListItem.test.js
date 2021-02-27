import { fireEvent, render, screen } from '@testing-library/react'
import ListItem from '../ListItem'

test('renders a description and a checkbox unchecked', () => {
  render(<ListItem id={1} description='Netflix' />)
  expect(screen.getByLabelText(/netflix/i)).not.toBeChecked()
})

test('renders another description and a checkbox checked', () => {
  render(<ListItem id={2} description='Spotify' isChecked />)
  expect(screen.getByLabelText(/spotify/i)).toBeChecked()
})

test('calls the onChange function when checkbox is clicked', () => {
  const onChangeMock = jest.fn()
  render(
    <ListItem id={3} description='Mobills Premium' onChange={onChangeMock} />
  )

  fireEvent.click(screen.getByLabelText(/mobills premium/i))

  expect(onChangeMock).toBeCalledWith({ id: 3 })
})
