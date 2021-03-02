import { formatReal } from 'utils/format-real'

const ListItem = ({ name, label, value, isPaid }) => (
  <li>
    <input type='checkbox' id={name} name={name} checked={isPaid} readOnly />
    <label htmlFor={name}>{label}</label>
    <span>R$ {formatReal(value)}</span>
  </li>
)

export default ListItem
