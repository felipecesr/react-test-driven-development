const sendQuery = require('./utils/send-query')

const GET_ALL_EXPENSES = `
  query {
    allExpenses {
      data {
        _id
        text
        value
        paid
      }
    }
  }
`

exports.handler = async () => {
  const { data, errors } = await sendQuery(GET_ALL_EXPENSES)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.allExpenses.data)
  }
}
