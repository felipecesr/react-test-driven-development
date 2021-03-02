# React Testing Library

React Testing Library é uma lib para testar componentes React de uma forma semelhante a forma que os usuários interagem com ele.

No arquivo `__tests__/ListItem.test.js`, vamos apagar a função `render` que criamos e importar da React Testing Library.

```javascript
import { render } from '@testing-library/react'
```

O funcionamento é semelhante ao `render` que implementamos, a diferença é que não precisamos da função `cleanup`.

```javascript
test('renders a text, paid status and value', () => {
  render(<ListItem name='netflix' label='Netflix' value={45.9} />)
  expect(document.body.querySelector('label').textContent).toContain('Netflix')
  expect(document.body.querySelector('input').checked).toBe(false)
  expect(document.body.querySelector('span').textContent).toBe('R$ 45,90')
})
```

Além disso, a partir de agora vamos passar a utilizar as queries da Testing Library ao invés do `querySelector`. O objeto `screen` da acesso a todas as queries.

```javascript
import { render, screen } from '@testing-library/react'
```

Agora podemos verificar se o checkbox não está marcado, pesquisando ele pela label, exatamente como um usuário ou um leitor de tela faria.

```javascript
expect(screen.getByLabelText(/netflix/i).checked).toBe(false)
```

Podemos pesquisar o valor diretamente pelo texto, e checar se ele está no documento com o `toBeInTheDocument`.

```javascript
expect(screen.getByText(/r\$ 45,90/i)).toBeInTheDocument()
```

> O toBeInTheDocument faz parte da @testing-library/jest-dom, precisamos instlar essa lib para poder usá-lo. Como estamos usando Create React App, não precisamos fazer isso.

Podemos deixar ainda melhor utilizando o `toBeChecked`.

```javascript
expect(screen.getByLabelText(/spotify/i)).toBeChecked()
```

E no primeiro teste, que o checkbox não está marcado podemos utilizar o `not` antes.

```javascript
expect(screen.getByLabelText(/netflix/i)).not.toBeChecked()
```

Por fim nossos testes devem estar assim:

```javascript
test('renders a text, paid status and value', () => {
  render(<ListItem name='netflix' label='Netflix' value={45.9} />)
  expect(screen.getByLabelText(/netflix/i)).not.toBeChecked()
  expect(screen.getByText(/r\$ 45,90/i)).toBeInTheDocument()
})

test('renders another test, paid status and value', () => {
  render(<ListItem name='spotify' label='Spotify' value={16.9} isPaid />)
  expect(screen.getByLabelText(/spotify/i)).toBeChecked()
  expect(screen.getByText(/r\$ 16,90/i)).toBeInTheDocument()
})
```
