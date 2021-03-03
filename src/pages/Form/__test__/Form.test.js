import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Redirect as MockRedirect } from 'react-router-dom'
import Form from '../Form'

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn()
  }
})

test('renders a form with description, value, paid and a submit button', async () => {
  jest.spyOn(window, 'fetch')
  window.fetch.mockResolvedValue()
  MockRedirect.mockImplementation(() => null)
  render(<Form />)

  screen.getByLabelText(/description/i).value = 'Shirt'
  screen.getByLabelText(/value/i).value = '59.9'
  screen.getByLabelText(/paid/i).checked = true
  const buttonElement = screen.getByRole('button', { name: /submit/i })

  fireEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()

  expect(window.fetch).toHaveBeenCalledWith('/api/save-expense', {
    method: 'POST',
    body: JSON.stringify({
      text: 'Shirt',
      value: '59.9',
      paid: true
    })
  })
  expect(window.fetch).toHaveBeenCalledTimes(1)

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  )
})
