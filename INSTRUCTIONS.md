# Testando um erro na requisição

Adicione mais um teste no `Home.test.js`.

Lembre-se que precisamos mockar o `fetch` novamente só que nesse caso retorna um erro.

```javascript
test('renders an error message when the list fails to load', async () => {
  jest.spyOn(window, 'fetch')

  window.fetch.mockImplementation(() => ({
    ok: false,
    json: async () => [{ message: 'An error has occured' }]
  }))

  render(<Home />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

  expect(window.fetch).toBeCalledWith('/api/items')
  expect(window.fetch).toBeCalledTimes(1)

  expect(screen.getByText(/an error has occured/i)).toBeInTheDocument()
})
```

## Fazendo o teste passar

No `Home.js` podemos adicionar mais um state

```javascript
const [error, setError] = useState(null)

useEffect(() => {
  const fetchItems = async () => {
    const response = await window.fetch('/api/items')
    const data = await response.json()

    if (!response.ok) {
      setError(data[0])
    } else {
      setItems(data)
    }

    seIsLoading(false)
  }

  fetchItems()
}, [])

return (
  <>
    <Header title='My Shopping List' openForm={() => history.push('new')} />
    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error.message}</div>
    ) : (
      <S.List>
```

## Refatorando

Também podemos fazer dessa forma

```diff
- await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
...
+ expect(await screen.findByText(/an error has occured/i)).toBeInTheDocument()
```

Remover o `spyOn` de cada teste e mover para um `beforeEach`

```javascript
beforeEach(() => jest.spyOn(window, 'fetch'))
```

Também podemos deixar essas mensagens de erro em uma só div

```javascript
const [items, setItems] = useState(null)

...

<div>{isLoading ? 'Loading...' : error ? error.message : ''}</div>
{items && (
  ...
```
