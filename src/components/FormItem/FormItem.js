import * as S from './styles'

const FormItem = ({ label, name, type = 'text' }) => (
  <S.Wrapper>
    <S.Label htmlFor={name}>{label}</S.Label>
    <S.Input type={type} id={name} name={name} />
  </S.Wrapper>
)

export default FormItem
