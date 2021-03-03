import { render as rtlRender, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

function render(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({
    initialEntries: [route]
  })

  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(<Router history={history}>{ui}</Router>, {
    wrapper: Wrapper,
    ...renderOptions
  })
}

test('app renders add new and go back and I can navigate to those pages', () => {
  render(<App />)

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

test('renders not found page for unknown urls', () => {
  render(<App />, { route: '/something-not-found' })
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
