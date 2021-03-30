import { render, screen, waitForElementToBeRemoved } from 'utils/test-utils'
import { rest } from 'msw'
import { server } from 'mocks/server'
import Home from '../Home'

test('shows the loading text and then renders a list', async () => {
  render(<Home />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(screen.getByRole('list')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

test('renders an error message when the list fails to load', async () => {
  const testErrorMessage = 'An error has occured'
  server.use(
    rest.get('/api/get-all-items', async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json([{ message: testErrorMessage }]))
    })
  )

  render(<Home />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
