import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  jest.spyOn(window, 'fetch')
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
})
