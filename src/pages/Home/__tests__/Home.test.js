import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { expenseBuilder } from 'utils/test-data'
import Home from '../Home'

test('shows the loading text and then renders a list', async () => {
  jest.spyOn(window, 'fetch')

  const mockResolvedValues = Array.from({ length: 3 }, () => expenseBuilder())

  window.fetch.mockImplementation(() => ({
    ok: true,
    json: async () => mockResolvedValues
  }))

  render(<Home />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(window.fetch).toBeCalledWith('/api/expenses')
  expect(window.fetch).toBeCalledTimes(1)

  expect(screen.getByRole('list')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)

  mockResolvedValues.forEach(({ text, paid }) => {
    expect(screen.getByLabelText(text).checked).toBe(paid)
  })
})
