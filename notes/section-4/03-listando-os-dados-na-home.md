# Listando os dados na Home

Primeiro vamos criar o teste `Home.test.js`.

```javascript
import { render } from '@testing-library/react'
import Home from '../Home'

test('shows the loading text and then renders a list', () => {
  render(<Home />)
})
```

O componente deve mostrar o texto "Loading" enquanto faz uma requisição para a API, quando os dados carregarem, deve exibir uma lista com os items.

Como vamos utilizar o `fetch`, precisamos criar um `mock`, só que diferente do que fizemos no `Form`, vamos adicionar uma implementação para ele.

Também podemos dizer que o teste é assíncrono.

```javascript
test('shows the loading text and then renders a list', async () => {
  jest.spyOn(window, 'fetch')

  window.fetch.mockImplementation(() => ({
    ok: true,
    json: async () => []
  }))

  render(<Home />)
})
```

Agora a Home precisa exibir um texto de loading. Vamos deixar assim por enquanto.

```javascript
render(<Home />)

screen.getByText(/loading/i)
```

Fazendo o teste passar

```javascript
const Home = ({ history }) => (
  <>
    <Header title='My List' openForm={() => history.push('new')} />
    <div>Loading...</div>
  </>
)
```

Agora precisamos fazer uma requisição para a API, para poder montar a lista após receber os dados.

Vamos testar se o `window.fetch` é chamado quando o componente é renderizado.

```javascript
screen.getByText(/loading/i)

expect(window.fetch).toBeCalledWith('/api/expenses')
expect(window.fetch).toBeCalledTimes(1)
```

Fazendo o teste passar

```javascript
import { useEffect } from 'react'
import Header from 'components/Header/Header'

const Home = ({ history }) => {
  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/expenses')
      const data = await response.json()
    }

    fetchItems()
  }, [])
```

Com o teste passando, vamos verificar se os itens estão sendo renderizados.

Mas antes disso, precisamos que o `fetch` retorne algo.

Crie um arquivo `utils/test-data` e mova a função `expenseBuilder` do `Form.test` pra lá.

Adicionamos os valores e verificamos se existe uma lista com 3 items.

```javascript
const mockResolvedValues = Array.from({ length: 3 }, () => expenseBuilder())

window.fetch.mockImplementation(() => ({
  ok: true,
  json: async () => mockResolvedValues
}))

...

expect(screen.getByRole('list')).toBeInTheDocument()
expect(screen.getAllByRole('listitem')).toHaveLength(3)
```

Fazendo passar

```javascript
import { useState, useEffect } from 'react'

...

const [items, setItems] = useState([])
const [isLoading, seIsLoading] = useState(true)

useEffect(() => {
  const fetchItems = async () => {
    const response = await window.fetch('/api/expenses')
    const data = await response.json()

    setItems(data)
    seIsLoading(false)
  }

  fetchItems()
}, [])

return (
  <>
    <Header title='My List' openForm={() => history.push('new')} />
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {items.map(() => <li />)}
      </ul>
    )}
  </>
)
```

Erro do `act`.

```javascript
await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
```

Erro da key

```javascript
// test-data.js
export const expenseBuilder = build('Expense').fields({
  _id: fake(f => f.random.uuid()),
  ...
  paid: fake(f => f.random.boolean())

// Home.js
<ul>
  {items.map(item => (
    <li key={item._id} />
  ))}
</ul>
```

Por fim só precisamos checar se os dados são exibidos corretamente.

```javascript
{
  items.map(item => (
    <ListItem
      key={item._id}
      label={item.text}
      name={item.text}
      value={45.9}
      isPaid={item.paid}
    />
  ))
}
```

Lembram dos testes unitários que escrevemos para o `ListItem`, não precisamos mais deles, porque aquele componente está coberto pelos testes de integração. Na verdade nem precisávamos começar testando por ele.
