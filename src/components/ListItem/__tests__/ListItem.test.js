import ReactDOM from 'react-dom'
import ListItem from '../ListItem'

test('renders a text, paid status and value', () => {
  const component = <ListItem name='netflix' label='Netflix' value={45.9} />
  const container = document.createElement('div')

  ReactDOM.render(component, container)
  document.body.appendChild(container)

  expect(document.body.querySelector('label').textContent).toContain('Netflix')
  expect(document.body.querySelector('input').checked).toBe(false)
  expect(document.body.querySelector('span').textContent).toBe('R$ 45,90')

  ReactDOM.unmountComponentAtNode(container)
  document.body.removeChild(container)
})

test('renders another text, paid status and value', () => {
  const component = (
    <ListItem name='spotify' label='Spotify' value={16.9} isPaid />
  )
  const container = document.createElement('div')

  ReactDOM.render(component, container)
  document.body.appendChild(container)

  expect(document.body.querySelector('label').textContent).toContain('Spotify')
  expect(document.body.querySelector('input').checked).toBe(true)
  expect(document.body.querySelector('span').textContent).toBe('R$ 16,90')

  ReactDOM.unmountComponentAtNode(container)
  document.body.removeChild(container)
})
