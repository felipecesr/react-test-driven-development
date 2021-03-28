import { render as rtlRender } from '@testing-library/react'
import AppProviders from 'context'

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {
    wrapper: AppProviders,
    ...renderOptions
  })
}

export * from '@testing-library/react'
export { render }
