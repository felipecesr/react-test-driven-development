import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-bottom: 2%;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  padding: 10px 0;
`

const Input = styled.input`
  flex-basis: 60%;
  border: 0;
  font-size: inherit;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid lightgray;
`

const FormItem = ({ label, name, type = 'text' }) => (
  <Wrapper>
    <Label htmlFor={name}>{label}</Label>
    <Input type={type} id={name} name={name} />
  </Wrapper>
)

export default FormItem
