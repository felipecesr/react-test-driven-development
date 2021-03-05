const sendQuery = require('./utils/send-query')

const CREATE_ITEM = `
  mutation($title: String!, $quantity: Int!, $price: Float!) {
    createItem(data: { title: $title, quantity: $quantity, price: $price }) {
      _id
      title
      quantity
      price
    }
  }
`

exports.handler = async event => {
  const values = JSON.parse(event.body)
  const { data, errors } = await sendQuery(CREATE_ITEM, values)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ newExpense: data.createExpense })
  }
}
