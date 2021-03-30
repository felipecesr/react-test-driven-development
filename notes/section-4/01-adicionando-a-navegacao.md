# Testes de Integração

Renderizar o App da mesma forma que é renderizado em production

## Adicionando a navegação

Como vamos testar a navegação do app, precisamos adicionar o `react-router` na aplicação.

```javascript
// index.js
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// App.js
import { Switch, Route } from 'react-router-dom'
import GlobalStyles from 'styles/global'
import Form from 'pages/Form/Form'

function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path='/new' component={Form} />
      </Switch>
    </>
  )
}
```

Vamos criar o teste `src/__tests__/App.test.js`

```javascript
test('app renders add new and go back and I can navigate to those pages', () => {
  render(<App />)
})
```

> Podemos debugar após cada alteração

Se executarmos o teste agora ele falha com o seguinte erro:

```bash
Invariant failed: You should not use <Switch> outside a <Router>
```

Normalmente importamos o `BrowserRouter`, mas vamos importar o `Router` para podermos criar nosso próprio history e especificar em qual página estamos.

```javascript
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

test('app renders add new and go back and I can navigate to those pages', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <App />
    </Router>
  )
})
```

Agora podemos procurar pelo título da página.

```javascript
expect(screen.getByRole('heading')).toHaveTextContent(/my list/i)
```

Para fazer o teste passar vamos criar o componente de `Header`.

```javascript
const Header = ({ title }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
  </S.Wrapper>
)
```

E também criar uma home page com esse componente

```javascript
// pages/Home/Home.js
const Home = () => <Header title='My List' />

// App.js
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/new' component={Form} />
</Switch>
```

Com o teste passando vamos adicionar mais algumas asserções.

```javascript
userEvent.click(screen.getByRole('button', { name: /add new/i }))
expect(screen.getByRole('heading')).toHaveTextContent(/add new/i)
```

Vamos adicionar o botão no Header.

```javascript
const Header = ({ title, openForm }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.HeaderButton onClick={openForm}>+ Add New</S.HeaderButton>
  </S.Wrapper>
)
```

E na Home passamos a prop para ele.

```javascript
const Home = ({ history }) => (
  <Header title='My List' openForm={() => history.push('new')} />
)
```

> Se estiver debugando já é possível ver o formulário

Vamos adicionar o `Header` no `Form` e fazer o teste passar.

```javascript
// Form.js
return (
    <>
      <Header title='Add New' />
      <S.Wrapper>
```

Não queremos que o botão para a página do formulário apareça dentro dela.
Vamos adicionar um teste para garantir que ele não aparece.

```javascript
expect(screen.getByRole('heading')).toHaveTextContent(/add new/i)
expect(
  screen.queryByRole('button', { name: /add new/i })
).not.toBeInTheDocument()
```

E fazer passar

```javascript
const Header = ({ title, openForm = false }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    {openForm && <S.HeaderButton onClick={openForm}>+ Add New</S.HeaderButton>}
  </S.Wrapper>
)
```

E se quisermos voltar para a Home? Vamos testar isso.

Após a ultima assertion adicione

```javascript
userEvent.click(screen.getByRole('button', { name: /go back/i }))

expect(screen.getByRole('heading')).toHaveTextContent(/my list/i)
expect(
  screen.queryByRole('button', { name: /go back/i })
).not.toBeInTheDocument()
```

No Header

```javascript
const Header = ({ goBack = false, title, openForm = false }) => (
  <S.Wrapper>
    {goBack && <S.HeaderButton onClick={goBack}>{'< go Back'}</S.HeaderButton>}
    <S.Title>{title}</S.Title>
    {openForm && <S.HeaderButton onClick={openForm}>+ Add New</S.HeaderButton>}
  </S.Wrapper>
)
```

E no Form

```javascript
const Form = ({ history }) => {
  ...

  return (
    <>
      <Header title='Add New' goBack={() => history.goBack()} />
      <S.Wrapper>
```
