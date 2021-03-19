import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { Redirect as MockRedirect } from 'react-router-dom'
import { render, screen, waitFor } from 'utils/test-utils'
import Login from '../Login'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn()
  }
})

function buildLoginForm(overrides) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('logging in redirects to the admin', async () => {
  MockRedirect.mockImplementation(() => null)
  render(<Login />)
  const { email, password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/email/i), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/new' }, {})
  )
})
