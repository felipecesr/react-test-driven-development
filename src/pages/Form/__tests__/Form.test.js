import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Redirect as MockRedirect } from 'react-router-dom'
import { expenseBuilder } from 'utils/test-data'
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
  const fakeExpense = expenseBuilder()

  render(<Form />)

  userEvent.type(screen.getByLabelText(/description/i), fakeExpense.text)
  userEvent.type(screen.getByLabelText(/value/i), fakeExpense.value)
  userEvent.click(screen.getByLabelText(/paid/i))
  const buttonElement = screen.getByRole('button', { name: /submit/i })

  userEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()

  expect(window.fetch).toHaveBeenCalledWith('/api/save-expense', {
    method: 'POST',
    body: JSON.stringify({
      text: fakeExpense.text,
      value: fakeExpense.value,
      paid: true
    })
  })
  expect(window.fetch).toHaveBeenCalledTimes(1)

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  )
})
