import {
  render,
  screen,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import { itemBuilder } from 'utils/test-data'
import Home from '../Home'

test('shows the loading text and then renders a list', async () => {
  jest.spyOn(window, 'fetch')

  const mockResolvedValues = Array.from({ length: 3 }, itemBuilder)

  window.fetch.mockImplementation(() => ({
    ok: true,
    json: async () => mockResolvedValues
  }))

  render(<Home />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(window.fetch).toBeCalledWith('/api/items')
  expect(window.fetch).toBeCalledTimes(1)

  expect(screen.getByRole('list')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)

  screen.getAllByRole('listitem').forEach((listitem, index) => {
    const { getByRole } = within(listitem)
    expect(getByRole('heading')).toHaveTextContent(
      mockResolvedValues[index].title
    )
  })
})
