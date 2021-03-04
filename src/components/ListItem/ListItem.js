import { formatReal } from 'utils/format-real'
import * as S from './styles'

const ListItem = ({ name, label, value, isPaid }) => (
  <S.Wrapper>
    <div>
      <input type='checkbox' id={name} name={name} checked={isPaid} readOnly />
      <S.Label htmlFor={name}>{label}</S.Label>
    </div>
    <span>R$ {formatReal(value)}</span>
  </S.Wrapper>
)

export default ListItem
