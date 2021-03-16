import { render as rtlRender } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

function render(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({
    initialEntries: [route]
  })

  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(<Router history={history}>{ui}</Router>, {
    wrapper: Wrapper,
    ...renderOptions
  })
}

export * from '@testing-library/react'
export { render }
