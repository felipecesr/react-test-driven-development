import userEvent from '@testing-library/user-event'
import { render, screen, waitForElementToBeRemoved } from 'utils/test-utils'
import { userBuilder } from 'utils/generate'
import * as auth from 'authProvider'
import App from '../App'

afterEach(() => {
  auth.logout()
})

test('renders the username and logout button and redirects to login page when logged out', async () => {
  const fakeUser = userBuilder()
  const currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() + 1)
  window.localStorage.setItem('userInfo', JSON.stringify(fakeUser))
  window.localStorage.setItem('expiresAt', currentDate / 1000)
  window.localStorage.setItem('token', 'SOME_FAKE_TOKEN')

  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  userEvent.click(screen.getByText(/log out/i))

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(screen.getByRole('heading')).toHaveTextContent(/login/i)
})

test('app renders add new and go back and I can navigate to those pages', () => {
  const fakeUser = userBuilder()
  const currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() + 1)
  window.localStorage.setItem('userInfo', JSON.stringify(fakeUser))
  window.localStorage.setItem('expiresAt', currentDate / 1000)
  window.localStorage.setItem('token', 'SOME_FAKE_TOKEN')

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
