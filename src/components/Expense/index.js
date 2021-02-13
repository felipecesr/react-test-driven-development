import * as S from './styles'

const Expense = ({ title, value, paid }) => (
  <S.Wrapper>
    <div>
      <S.Title>{title}</S.Title>
      <S.Value>R$ {value}</S.Value>
    </div>
    <S.Paid paid={paid}>{paid ? 'Pago' : 'A Pagar'}</S.Paid>
  </S.Wrapper>
)

export default Expense
