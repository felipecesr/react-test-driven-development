import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import { itemBuilder } from 'utils/test-data'
import Home from '../Home'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from 'store/reducer'
import rootSaga from 'store/sagas'

const initialState = {
  loading: true,
  items: null,
  error: null
}

function render(ui, { initialState, ...renderOptions } = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

beforeEach(() => jest.spyOn(window, 'fetch'))

test('shows the loading text and then renders a list', async () => {
  const mockResolvedValues = Array.from({ length: 3 }, itemBuilder)

  window.fetch.mockImplementation(() => ({
    ok: true,
    json: async () => mockResolvedValues
  }))

  render(<Home />, { initialState })

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

test('renders an error message when the list fails to load', async () => {
  window.fetch.mockImplementation(() => ({
    ok: false,
    json: async () => [{ message: 'An error has occured' }]
  }))

  render(<Home />, { initialState })

  expect(window.fetch).toBeCalledWith('/api/items')
  expect(window.fetch).toBeCalledTimes(1)

  expect(await screen.findByText(/an error has occured/i)).toBeInTheDocument()
})
