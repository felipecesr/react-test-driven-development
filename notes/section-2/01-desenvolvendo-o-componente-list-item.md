# Desenvolvendo o componente ListItem

O arquivo `__tests__/ListItem.test.js` é onde começamos escrevendo nosso primeiro teste com falha.

```javascript
test('renders a text, paid status and value', () => {
  const component = <ListItem />
  const container = document.createElement('div')

  ReactDOM.render(component, container)
  document.body.appendChild(container)

  expect(document.body.querySelector('label').textContent).toContain('Netflix')
  expect(document.body.querySelector('input').checked).toBe(false)
  expect(document.body.querySelector('span').textContent).toBe('R$ 45,90')
})
```

Em seguida, fazemos nosso teste passar.

```javascript
const ListItem = () => (
  <li>
    <input type='checkbox' id='netflix' name='netflix' />
    <label htmlFor='netflix'>Netflix</label>
    <span>R$ 45,90</span>
  </li>
)
```

Com o teste passando, vamos escrever o nosso segundo teste com falha.

```javascript
test('renders another text, paid status and value', () => {
  const component = <ListItem />
  const container = document.createElement('div')

  ReactDOM.render(component, container)
  document.body.appendChild(container)

  expect(document.body.querySelector('label').textContent).toContain('Spotify')
  expect(document.body.querySelector('input').checked).toBe(true)
  expect(document.body.querySelector('span').textContent).toBe('R$ 16,90')
})
```

Quando executamos o teste ele retorna o texto duplicado, isso ocorre porque o primeiro teste está interferindo no segundo. Não podemos deixar isso acontecer.

Para resolver esse problema, removemos o componente antes de seguir para o próximos teste.

```javascript
ReactDOM.unmountComponentAtNode(container)
document.body.removeChild(container)
```

Para fazer o teste passar, precisamos fazer alterações. Primeiro passamos algumas props para o componente.

```javascript
test('renders a text, paid status and value', () => {
  const component = <ListItem name='netflix' label='Netflix' value={45.9} />

...

test('renders another text, paid status and value', () => {
  const component = <ListItem name='spotify' label='Spotify' value={16.9} isPaid />
```

Note que o valor passado é um Number, mas o componente deve exibi-lo formatado, precisamos de uma função que faça isso. Dentro do componente importamos a função `formatReal`.

```javascript
import { formatReal } from 'utils/format-real'
```

E depois atualizamos o componente.

```javascript
const ListItem = ({ name, label, value, isPaid }) => (
  <li>
    <input type='checkbox' id={name} name={name} checked={isPaid} readOnly />
    <label htmlFor={name}>{label}</label>
    <span>R$ {formatReal(value)}</span>
  </li>
)
```
