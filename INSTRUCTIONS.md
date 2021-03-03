# Página 404

Adicionamos um novo teste.

```javascript
test('renders not found page for unknown urls', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-not-found']
  })
  render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
```

Vamos criar o componente `Error`

```javascript
const Error = () => (
  <div>
    <h2>404</h2>
    <p>Page not found</p>
  </div>
)
```

E adicioná-lo no `App`

```javascript
<Route exact path='/' component={Home} />
<Route path='/new' component={Form} />
<Route component={Error} />
```

Podemos refatorar os testes

```javascript
function render(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({
    initialEntries: [route]
  })

  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(<Router history={history}>{ui}</Router>, {
    wrapper: Wrapper,
    ...renderOptions
  })
}

...

test('renders not found page for unknown urls', () => {
  render(<App />, { route: '/something-not-found' })
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
```
