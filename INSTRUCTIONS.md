# Dublês de Teste

Dublê de teste é um objeto que atua no lugar de outro objeto, eles podem ser vistos com vários nomes: spies, stubs, mocks, dummies e fakes. Normalmente usamos os dois primeiros.

Para não confundir, vou chamar apenas de mock.

Vamos adicionar mais um teste em `__tests__/ListItem.test.js`.

```javascript
test('calls the onChange function when checkbox is clicked', () => {
  render(<ListItem name='amazon' label='Amazon Prime' value={9.9} />)
})
```

Como o próprio título do teste diz, nó queremos saber se a função `onChange` é chamada quando o usuário clica no checkbox.

Para isso vamos utilizar uma função mock do Jest e passar como prop para o componente.

> Funções mock ou Spies, permite espionar o comportamento de uma função em diferentes situações.

```javascript
const onChangeMock = jest.fn()
render(
  <ListItem
    name='amazon'
    label='Amazon Prime'
    value={9.9}
    onChange={onChangeMock}
  />
)
```

Feito isso, vamos clicar no checkbox, para isso precisamos importar o `fireEvent` da Testing Library.

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
```

Ele vai nos permitir simular eventos, agora podemos clicar no checkbox e verificar se a função foi chamada.

```javascript
test('calls the onChange function when checkbox is clicked', () => {
  const onChangeMock = jest.fn()
  render(
    <ListItem
      name='amazon'
      label='Amazon Prime'
      value={9.9}
      onChange={onChangeMock}
    />
  )

  const inputElement = screen.getByLabelText(/amazon prime/i)
  fireEvent.click(inputElement)

  expect(onChangeMock).toBeCalled()
})
```

Vamos fazer o teste passar.

```javascript
const ListItem = ({ name, label, value, isPaid, onChange }) => (
  <li>
    <input
      type='checkbox'
      id={name}
      name={name}
      checked={isPaid}
      onChange={() => onChange()}
    />
    <label htmlFor={name}>{label}</label>
    <span>R$ {formatReal(value)}</span>
  </li>
)
```
