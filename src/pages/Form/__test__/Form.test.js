import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  render(<Form />)

  screen.getByLabelText(/description/i)
  screen.getByLabelText(/value/i)
  screen.getByLabelText(/paid/i)
  const buttonElement = screen.getByRole('button', { name: /submit/i })

  fireEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()
})
