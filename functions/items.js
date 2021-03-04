const sendQuery = require('./utils/send-query')

const GET_ALL_ITEMS = `
  query {
    allItems {
      data {
        _id
        title
        quantity
        price
      }
    }
  }
`

exports.handler = async () => {
  const { data, errors } = await sendQuery(GET_ALL_ITEMS)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.allItems.data)
  }
}
