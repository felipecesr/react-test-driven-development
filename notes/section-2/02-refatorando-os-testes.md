# Refatorando os testes

Ainda no arquivo `__tests__/ListItem.test.js`, com os testes passando, vamos refatorar o código.

Criamos uma função `render` com toda a lógica que estava repetida nos códigos.

```javascript
function render(component) {
  const container = document.createElement('div')

  ReactDOM.render(component, container)
  document.body.appendChild(container)

  return {
    cleanup() {
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
    }
  }
}
```

Feito isso, podemos atualizar os testes.

```javascript
test('renders a text, paid status and value', () => {
  const { cleanup } = render(
    <ListItem name='netflix' label='Netflix' value={45.9} />
  )
  expect(document.body.querySelector('label').textContent).toContain('Netflix')
  expect(document.body.querySelector('input').checked).toBe(false)
  expect(document.body.querySelector('span').textContent).toBe('R$ 45,90')
  cleanup()
})

test('renders another test, paid status and value', () => {
  const { cleanup } = render(
    <ListItem name='spotify' label='Spotify' value={16.9} isPaid />
  )
  expect(document.body.textContent).toContain('Spotify')
  expect(document.body.querySelector('input').checked).toBe(true)
  expect(document.body.querySelector('span').textContent).toBe('R$ 16,90')
  cleanup()
})
```
