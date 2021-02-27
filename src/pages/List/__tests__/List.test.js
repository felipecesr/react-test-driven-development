import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import List from '../List'

beforeAll(() => jest.spyOn(window, 'fetch'))

test('renders a list of expenses', async () => {
  const items = [
    {
      _id: 1,
      text: 'Netflix',
      paid: true
    },
    {
      _id: 2,
      text: 'Spotify',
      paid: false
    }
  ]

  window.fetch.mockResolvedValue({
    ok: true,
    json: async () => items
  })

  render(<List />)
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(window.fetch).toBeCalledWith('/api/expenses', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  expect(window.fetch).toBeCalledTimes(1)

  items.forEach(({ text, paid }) =>
    expect(
      screen.getByRole('checkbox', { name: text, checked: paid })
    ).toBeInTheDocument()
  )
})
