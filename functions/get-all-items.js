const { ddbDocClient } = require('./utils/dbclient')

exports.handler = async () => {
  // const { user } = context.clientContext

  // if (!user) {
  //   return {
  //     statusCode: 401,
  //     body: 'Not Authorized'
  //   }
  // }

  const params = {
    TableName: 'shopping',
    KeyConditionExpression: 'pk = :userid and begins_with(sk, :todokey)',
    ExpressionAttributeValues: {
      // ':userid': user.sub,
      ':todokey': 'todo#'
    }
  }

  try {
    const response = await ddbDocClient.query(params)
    const items = response.Items.map(({ sk, data }) => ({
      _id: sk.replace('todo#', ''),
      ...data
    }))

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
