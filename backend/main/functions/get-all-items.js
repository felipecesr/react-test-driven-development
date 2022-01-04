const { ddbDocClient } = require('../../infra/database/dynamodb')
const { listByUser } = require('../../infra/repository/database/list-by-user')
const { getAllTodos } = require('../../application/usecase/get-all')

exports.handler = async (event, context) => {
  const { user } = context.clientContext

  if (!user) {
    return {
      statusCode: 401,
      body: 'Not Authorized'
    }
  }

  try {
    const items = await getAllTodos(listByUser(ddbDocClient))(user.sub)
    return {
      statusCode: 200,
      body: JSON.stringify(items)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
