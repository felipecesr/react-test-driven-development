# Styled Components

Vamos criar o arquivo `ListItem/styles.js`, criar os estilos do nosso componente e verificar se os testes continuam passando.

Agora só precisamos adicionar mais um teste, quando o checkbox estiver marcado, o texto deve ficar riscado. Para isso vamos adicionar mais um `expect` nos testes:

```javascript
test('renders a text, paid status and value', () => {
  ...
  expect(screen.getByText(/netflix/i)).not.toHaveStyle({
    textDecoration: 'line-through'
  })
})

test('renders another test, paid status and value', () => {
  ...
  expect(screen.getByText(/spotify/i)).toHaveStyle({
    textDecoration: 'line-through'
  })
})
```

Fazendo o teste passar.

```javascript
export const Label = styled.label`
  input:checked + & {
    text-decoration: line-through;
  }
`
```

Agora, com todos os testes passando, podemos adicionar o ListItem na aplicação (App.js) para ver como ficou no browser.

```javascript
<div>
  <h1>My app</h1>
  <ListItem name='netflix' label='Netflix' value={45.9} onChange={() => null} />
</div>
```
