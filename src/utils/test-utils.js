import { render as rtlRender } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { IdentityContextProvider } from 'react-netlify-identity'

function render(ui, { route = '/', providerProps, ...renderOptions } = {}) {
  const history = createMemoryHistory({
    initialEntries: [route]
  })

  function Wrapper({ children }) {
    const url = 'https://react-test-driven-development.netlify.app/'
    return (
      <IdentityContextProvider url={url} {...providerProps}>
        <Router history={history}>{children}</Router>
      </IdentityContextProvider>
    )
  }

  return rtlRender(<Router history={history}>{ui}</Router>, {
    wrapper: Wrapper,
    ...renderOptions
  })
}

export * from '@testing-library/react'
export { render }
