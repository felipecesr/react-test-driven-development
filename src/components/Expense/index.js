const Expense = ({ title, value, paid }) => (
  <div>
    <div>{title}</div>
    <div>R$ {value}</div>
    <div>{paid ? 'Pago' : 'A Pagar'}</div>
  </div>
)

export default Expense
