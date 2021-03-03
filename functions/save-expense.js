const sendQuery = require('./utils/send-query')

const CREATE_EXPENSE = `
  mutation($text: String!, $value: Float!, $paid: Boolean!) {
    createExpense(data: { text: $text, value: $value, paid: $paid }) {
      _id
      text
      value
      paid
    }
  }
`

exports.handler = async event => {
  const values = JSON.parse(event.body)
  const { data, errors } = await sendQuery(CREATE_EXPENSE, {
    text: values.text,
    value: Number(values.value),
    paid: values.paid
  })

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
