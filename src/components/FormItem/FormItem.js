import * as S from './styles'

const FormItem = ({ label, name, type = 'text', ...options }) => (
  <S.Wrapper>
    <S.Label htmlFor={name}>{label}</S.Label>
    <S.Input type={type} id={name} name={name} {...options} />
  </S.Wrapper>
)

export default FormItem
