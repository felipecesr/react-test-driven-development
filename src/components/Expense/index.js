const Expense = ({ description, value, paid }) => (
  <div>
    <div>{description}</div>
    <div>R$ {value}</div>
    <div>{paid ? 'Pago' : 'A Pagar'}</div>
  </div>
)

export default Expense
