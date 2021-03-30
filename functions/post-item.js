const { v4: uuid } = require('uuid')
const { ddbDocClient } = require('./utils/dbclient')

exports.handler = async (event, context) => {
  const { user } = context.clientContext

  if (!user) {
    return {
      statusCode: 401,
      body: 'Not Authorized'
    }
  }

  const params = {
    TableName: 'shopping',
    Item: {
      pk: user.sub,
      sk: `todo#${uuid()}`,
      data: JSON.parse(event.body)
    }
  }

  try {
    const res = await ddbDocClient.put(params)

    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
