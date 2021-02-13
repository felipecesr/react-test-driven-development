const Expense = ({ title, value, paid }) => (
  <div>
    <h2>{title}</h2>
    <div>R$ {value}</div>
    <div>{paid ? 'Pago' : 'A Pagar'}</div>
  </div>
)

export default Expense
