import userEvent from '@testing-library/user-event'
import { Redirect as MockRedirect } from 'react-router-dom'
import { render, screen, waitFor } from 'utils/test-utils'
import { loginBuilder } from 'utils/generate'
import Login from '../Login'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
  }
})

test('logging in redirects to the admin', async () => {
  render(<Login />)
  const { username, password } = loginBuilder()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  const submitButton = screen.getByRole('button', { name: /submit/i })

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/new' }, {})
  )
})

test('omitting the fields results in an error', async () => {
  render(<Login />)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  userEvent.click(submitButton)

  expect((await screen.findByRole('alert')).textContent).toMatchInlineSnapshot(
    `"No user found with that email, or password invalid."`
  )
  expect(submitButton).not.toBeDisabled()
})
