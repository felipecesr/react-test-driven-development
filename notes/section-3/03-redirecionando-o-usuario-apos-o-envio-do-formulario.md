# Redirecionando o usuário após o envio do formulário

Após enviar o formulário, o usuário deve ser redirecionado para a página inicial.

Para fazer isso, vamos adicionar o `react-router-dom` no projeto.

```bash
yarn add react-router-dom
```

No arquivo `src/pages/Form/__test__/Form.test.js` importe o componente Redirect.

```javascript
import { Redirect as MockRedirect } from 'react-router-dom'
```

E precisamos mockar, agora utilizando o `jest.mock`, e adicionar `null` como valor de retorno (porque é um componente).

```javascript
jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn()
  }
})

test('renders a form with description, value, paid and a submit button', () => {
  jest.spyOn(window, 'fetch')
  window.fetch.mockResolvedValue() // é necessário o fetch precisa ser uma Promisse
  MockRedirect.mockImplementation(() => null)
  render(<Form />)

  ...

  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}) // componentes são chamados com um segundo argumento
  expect(MockRedirect).toHaveBeenCalledTimes(1)
```

## Fazendo o teste passar

```javascript
const Form = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    ...

    window
      .fetch('/api/save-expense', {
        ...
      })
      .then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return ...
```

Após a requisição usamos o `setRedirect`, mesmo assim o teste está falhando.

```bash
Number of calls: 0
```

Isso acontece porque o `window.fetch` é assíncrono e só chamamos o `setRedirect` após a requisição.

Além disso, precisamos dizer que o teste é assíncrono e utilizar o `waitFor` da Testing Library, .

```javascript
test('renders a form with description, value, paid and a submit button', async () => {
  jest.spyOn(window, 'fetch')

  ...

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  )
```
