import { render, screen, waitFor } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Redirect as MockRedirect } from 'react-router-dom'
import faker from 'faker'
import { itemBuilder, userBuilder } from 'utils/generate'
import App from '../../../App'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
  }
})

// afterEach(async () => {
//   await auth.logout()
// })

test('renders a form with title, quantity, price and a submit button', async () => {
  const fakeUser = userBuilder()
  const fakeItem = itemBuilder()

  window.localStorage.setItem('userInfo', JSON.stringify(fakeUser))
  window.localStorage.setItem('expiresAt', faker.random.number())
  window.localStorage.setItem('token', 'SOME_FAKE_TOKEN')

  render(<App />, { route: '/new' })

  userEvent.type(screen.getByLabelText(/title/i), fakeItem.title)
  userEvent.type(
    screen.getByLabelText(/quantity/i),
    fakeItem.quantity.toString()
  )
  userEvent.type(screen.getByLabelText(/price/i), fakeItem.price.toString())
  const submitButton = screen.getByRole('button', { name: /add item/i })

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  )
})
