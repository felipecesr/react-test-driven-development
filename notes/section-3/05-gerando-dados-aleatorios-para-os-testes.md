# Gerando dados aleatórios para os testes

Note que estamos criando dados para os testes, não tem nenhum problema em fazer isso.

```javascript
userEvent.type(screen.getByLabelText(/description/i), 'Shirt')
userEvent.type(screen.getByLabelText(/value/i), '59.9')
userEvent.click(screen.getByLabelText(/paid/i))
```

Como são poucos dados é bem tranquilo, mas existem casos em que fazer isso pode ser bem chato, se forem muitos dados ou se você simplesmente não gosta de pensar nesses dados.

No final isso nem importa, o que queremos é garantir que a aplicação esteja funcionando.

Então o que vamos fazer aqui é gerar esses dados automaticamente com o `test-data-bot`.

```bash
yarn add test-data-bot --dev
```

```javascript
import { build, fake } from 'test-data-bot'

...

const expenseBuilder = build('Expense').fields({
  text: fake(f => f.lorem.word()),
  value: fake(f => f.random.number()).toString()
})

test('renders a form with description, value, paid and a submit button', async () => {
  jest.spyOn(window, 'fetch')
  window.fetch.mockResolvedValue()
  MockRedirect.mockImplementation(() => null)
  const fakeExpense = expenseBuilder()
  render(<Form />)

  ...

  userEvent.type(screen.getByLabelText(/description/i), fakeExpense.text)
  userEvent.type(screen.getByLabelText(/value/i), fakeExpense.value)

  ...

  expect(window.fetch).toHaveBeenCalledWith('/api/save-expense', {
    method: 'POST',
    body: JSON.stringify({
      text: fakeExpense.text,
      value: fakeExpense.value,
      paid: true
    })
  })
```
