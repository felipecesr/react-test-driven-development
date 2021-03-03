# Melhorando os eventos do teste

Com os testes passando, podemos refatorar os testes.

Note que preenchemos os formulários atribuindo os valores.

```javascript
screen.getByLabelText(/description/i).value = 'Shirt'
screen.getByLabelText(/value/i).value = '59.9'
screen.getByLabelText(/paid/i).checked = true
```

Na verdade, quando o usuário altera o valor de um campo, ele deve chamar o `onChange`, podemos fazer dessa forma.

```javascript
fireEvent.change(screen.getByLabelText(/description/i), {
  target: { value: 'Shirt' }
})
fireEvent.change(screen.getByLabelText(/value/i), { target: { value: '59.9' } })
fireEvent.click(screen.getByLabelText(/paid/i))
```

Ou ainda melhor, vamos importar o `userEvent`.

```javascript
import userEvent from '@testing-library/user-event'
```

O `userEvent` permite disparar eventos da forma mais próxima possível do usuário.

```javascript
userEvent.type(screen.getByLabelText(/description/i), 'Shirt')
userEvent.type(screen.getByLabelText(/value/i), '59.9')
userEvent.click(screen.getByLabelText(/paid/i))
const buttonElement = screen.getByRole('button', { name: /submit/i })

userEvent.click(buttonElement)
```

Note que dessa forma já dispensamos até alguns detalhes de implementação.
