import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/test-utils'
import App from '../App'

test('app renders add new and go back and I can navigate to those pages', () => {
  render(<App />)

  expect(screen.getByRole('heading')).toHaveTextContent(/my.*list/i)

  userEvent.click(screen.getByRole('button', { name: /add new/i }))

  expect(screen.getByRole('heading')).toHaveTextContent(/add new/i)
  expect(
    screen.queryByRole('button', { name: /add new/i })
  ).not.toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: /go back/i }))

  expect(screen.getByRole('heading')).toHaveTextContent(/my.*list/i)
  expect(
    screen.queryByRole('button', { name: /go back/i })
  ).not.toBeInTheDocument()
})

test('renders not found page for unknown urls', () => {
  render(<App />, { route: '/something-not-found' })
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
