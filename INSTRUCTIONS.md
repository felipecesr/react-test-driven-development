# Refatorando os campos e adicionando estilos

Crie o componente Button `components/Button/Button.js`

```javascript
import styled from 'styled-components'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: white;
  padding: 10px;
  line-height: 2;
  border-radius: 5px;
  border: 0;
  font-size: inherit;
  cursor: pointer;
`

export default Button
```

Adicione o `pages/Form/styles.js`.

```javascript
import styled from 'styled-components'
import Button from 'components/Button/Button'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`

export const SubmitButton = styled(Button)`
  background-color: blue;
  margin: 2% 0;
`
```

Crie o componente `components/FormItem/FormItem.js`

```javascript
import * as S from './styles'

const FormItem = ({ label, name, type = 'text' }) => (
  <S.Wrapper>
    <S.Label htmlFor={name}>{label}</S.Label>
    <S.Input type={type} id={name} name={name} />
  </S.Wrapper>
)

export default FormItem
```

Crie os estilos `components/FormItem/styles.js`

```javascript
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-bottom: 2%;
`

export const Label = styled.label`
  display: block;
  font-weight: bold;
  padding: 10px 0;
`

export const Input = styled.input`
  flex-basis: 60%;
  border: 0;
  font-size: inherit;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid lightgray;
`
```

Refatore o Form

```javascript
return (
  <S.Wrapper>
    <form onSubmit={handleSubmit}>
      <FormItem label='Description' name='description' />
      <FormItem label='Value' name='value' />
      <FormItem label='Paid' name='paid' type='checkbox' />
      <button type='submit' disabled={isSaving}>
        Submit
      </button>
    </form>
  </S.Wrapper>
)
```
