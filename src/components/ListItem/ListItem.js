import { formatReal } from 'utils/format-real'

const ListItem = ({ name, label, value, isPaid, onChange }) => (
  <li>
    <input
      type='checkbox'
      id={name}
      name={name}
      checked={isPaid}
      onChange={() => onChange()}
    />
    <label htmlFor={name}>{label}</label>
    <span>R$ {formatReal(value)}</span>
  </li>
)

export default ListItem
