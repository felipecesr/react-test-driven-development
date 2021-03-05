import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Redirect as MockRedirect } from 'react-router-dom'
import { itemBuilder } from 'utils/test-data'
import Form from '../Form'

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn()
  }
})

test('renders a form with title, quantity, price and a submit button', async () => {
  jest.spyOn(window, 'fetch')
  window.fetch.mockResolvedValue()
  MockRedirect.mockImplementation(() => null)
  const fakeItem = itemBuilder()

  render(<Form />)

  userEvent.type(screen.getByLabelText(/title/i), fakeItem.title)
  userEvent.type(
    screen.getByLabelText(/quantity/i),
    fakeItem.quantity.toString()
  )
  userEvent.type(screen.getByLabelText(/price/i), fakeItem.price.toString())
  const buttonElement = screen.getByRole('button', { name: /add item/i })

  userEvent.click(buttonElement)
  await waitFor(() => expect(buttonElement).toBeDisabled())

  expect(window.fetch).toHaveBeenCalledWith('/api/save-item', {
    method: 'POST',
    body: JSON.stringify({
      title: fakeItem.title,
      quantity: fakeItem.quantity,
      price: fakeItem.price
    })
  })
  expect(window.fetch).toHaveBeenCalledTimes(1)

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  )
})
