const ListItem = ({ id, description, isChecked, onChange }) => (
  <li>
    <input
      type='checkbox'
      id={`input-${id}`}
      checked={isChecked}
      onChange={() => onChange({ id })}
    />
    <label htmlFor={`input-${id}`}>{description}</label>
  </li>
)

export default ListItem
