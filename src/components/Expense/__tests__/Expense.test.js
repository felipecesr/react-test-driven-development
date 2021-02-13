import ReactDOM from 'react-dom'
import Expense from '../index'

function render(component) {
  const container = document.createElement('div')
  ReactDOM.render(component, container)

  return {
    container
  }
}

describe('Expense', () => {
  it('renders the description', () => {
    const description = 'Netflix'
    const { container } = render(<Expense description={description} />)
    expect(container.textContent).toBe('Netflix')
  })

  it('renders another description', () => {
    const description = 'Spotify'
    const { container } = render(<Expense description={description} />)
    expect(container.textContent).toBe('Spotify')
  })
})
