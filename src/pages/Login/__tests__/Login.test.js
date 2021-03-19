import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { render, screen } from 'utils/test-utils'
import Login from '../Login'

function buildLoginForm(overrides) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with email and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const { email, password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/email/i), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith({
    email,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
