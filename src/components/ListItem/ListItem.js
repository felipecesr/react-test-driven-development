import * as S from './styles'

const ListItem = ({ title, quantity, price }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Total>Quantity: {quantity}</S.Total>
    <S.Total>$ {price}</S.Total>
  </S.Wrapper>
)

export default ListItem
