# Desenvolvendo o componente Form

Vamos criar o arquivo `pages/Form/__test__/Form.test.js` e escrever o primeiro teste.

```javascript
import { render, screen } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  render(<Form />)

  screen.getByLabelText(/description/i)
  screen.getByLabelText(/value/i)
  screen.getByLabelText(/paid/i)
  screen.getByRole('button', { name: /submit/i })
})
```

Quando executamos o código ele retorna um erro mostrando onde o teste falhou. Para fazer o teste passar, podemos adicionar os campos e ver as mudanças nos resultados dos testes.

Adicione o campo description.

```javascript
<label htmlFor='description-input'>Description</label>
<input type='text' id='description-input' />
```

Note que o erro mudou, isso acontece porque quando utilizamos queries do tipo `getBy` e nenhum elemento é encontrado, um erro é retornado dizendo exatamente onde o teste quebrou.

É como se estivessemos testando se um elemento está na página com o `toBeInTheDocument`, mas de forma implícita.

Fazendo o teste passar.

```javascript
const Form = () => (
  <form>
    <label htmlFor='description-input'>Description</label>
    <input type='text' id='description-input' />

    <label htmlFor='value-input'>Value</label>
    <input type='text' id='value-input' />

    <label htmlFor='paid-input'>Paid</label>
    <input type='checkbox' id='paid-input' />

    <button type='submit'>Submit</button>
  </form>
)

export default Form
```

Se executarmos o teste novamente, podemos ver que ele está passando.

## Adicionando o evento Submit ao formulário

A próxima coisa que iremos fazer é desabilitar o botão após o clique e submeter o formulário.

Para isso, vamos criar uma `const` no teste para armazenar o botão e importar o `fireEvent` da Testing Library para executar o evento de clique, depois podemos verificar se o botão está desabilitado.

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  render(<Form />)

  ...
  const buttonElement = screen.getByRole('button', { name: /submit/i })

  fireEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()
})
```

Se executarmos o código agora, além da falha esperada do teste, também foi retornado um erro no console.

```bash
Error: Not implemented: HTMLFormElement.prototype.submit
```

Esse erro ocorre porque quando clicamos no botão, o comportamento padrão é recarregar a página inteira, o Jest usa o js-dom por padrão e ele não tem esse comportamento implementado.

Para que ele não ocorra mais, podemos implementar a função `handleSubmit`, adicionar o `e.preventDefault()` para remover esse comportamento e adicioná-la no evento `onSubmit` do formulário.

```javascript
const Form = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
...
```

Fazendo o teste passar.

```javascript
import { useState } from 'react'

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)
  }

  ...

  <button type='submit' disabled={isSaving}>
    Submit
  </button>
```
