import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

test('app renders add new and go back and I can navigate to those pages', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(screen.getByRole('heading')).toHaveTextContent(/my list/i)

  userEvent.click(screen.getByRole('button', { name: /add new/i }))

  expect(screen.getByRole('heading')).toHaveTextContent(/add new/i)
  expect(
    screen.queryByRole('button', { name: /add new/i })
  ).not.toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: /go back/i }))

  expect(screen.getByRole('heading')).toHaveTextContent(/my list/i)
  expect(
    screen.queryByRole('button', { name: /go back/i })
  ).not.toBeInTheDocument()
})
