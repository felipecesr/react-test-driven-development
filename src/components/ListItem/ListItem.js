import { formatReal } from 'utils/format-real'
import * as S from './styles'

const ListItem = ({ name, label, value, isPaid, onChange }) => (
  <S.Wrapper>
    <div>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={isPaid}
        onChange={() => onChange()}
      />
      <S.Label htmlFor={name}>{label}</S.Label>
    </div>
    <span>R$ {formatReal(value)}</span>
  </S.Wrapper>
)

export default ListItem
