# Adicionando Redux + Redux Saga no fluxo da Home

Adiciona packages

```bash
yarn add redux react-redux redux-saga
```

Adiciona `reducer.js`

Adiciona `sagas.js`

Adiciona `index.js`

Adiciona o `Provider` no `App.js`

```javascript
import store from 'store'

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Switch>...</Switch>
      </Provider>
    </>
  )
}
```

Adicionar o Redux na Home

Vamos refatorar a Home para utilizar os dados do Redux, não vou começar pelos teste porque o funcionamento da página não deve mudar, é uma refatoração.

```javascript
import { useSelector, useDispatch } from 'react-redux'

const Home = ({ history }) => {
  const { loading, items, error } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'GET_ITEMS_REQUEST' })
  }, [dispatch])
```

Se executarmos a aplicação ela funciona, mas o teste não.

Isso acontece porque não renderizamos a Home com o `Provider`.

Sempre que uma página tiver um context, ele tem que ser renderizado no teste.

Para fazer isso, vamos precisar mockar a store, criar uma store para os testes.

```javascript
// Home.test.js
const initialState = {
  loading: true,
  items: null,
  error: null
}

function renderWithStore(ui, { initialState, ...renderOptions } = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
```

Note que os testes voltaram a passar e com alta cobertura.
