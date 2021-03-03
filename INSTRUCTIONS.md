# Enviando dados para uma API

Chegou a hora de enviar os dados do formulário para uma API, só que não queremos fazer uma requisição, vamos usar mocks.

Primeiro, vamos mockar o fetch

```javascript
jest.spyOn(window, 'fetch')
render(<Form />)
```

Agora precisamos preencher o formulário, com os dados que queremos enviar.

```javascript
screen.getByLabelText(/description/i).value = 'Shirt'
screen.getByLabelText(/value/i).value = '59.9'
screen.getByLabelText(/paid/i).checked = true
```

Por fim, vamos fazer as asserções

```javascript
expect(window.fetch).toHaveBeenCalledWith('/api/save-expense', {
  method: 'POST',
  body: JSON.stringify({
    text: 'Shirt',
    value: '59.9',
    paid: true
  })
})
expect(window.fetch).toHaveBeenCalledTimes(1)
```

## Fazendo o teste passar

Para que o teste passe, primeiro precisamos adicionar o atributo `name` nos campos do formulário.

```javascript
<label htmlFor='description-input'>Description</label>
<input ... name='description' />

<label htmlFor='value-input'>Value</label>
<input ... name='value' />

<label htmlFor='paid-input'>Paid</label>
<input ... name='paid' />
```

E dentro do `handleSubmit`, chamamos o `fetch` com os dados do formulário.

```javascript
const handleSubmit = e => {
  e.preventDefault()
  setIsSaving(true)

  const { description, value, paid } = e.target.elements

  window
    .fetch('/api/save-expense', {
      method: 'POST',
      body: JSON.stringify({
        text: description.value,
        value: value.value,
        paid: paid.checked
      })
    })
    .then(() => setIsSaving(false))
}
```
