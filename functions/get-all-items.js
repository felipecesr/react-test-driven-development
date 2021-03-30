require('dotenv').config()
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb')

const REGION = 'us-east-1'

const dbclient = new DynamoDBClient({ region: REGION })
const ddbDocClient = DynamoDBDocument.from(dbclient)

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
    KeyConditionExpression: 'pk = :userid and begins_with(sk, :todokey)',
    ExpressionAttributeValues: {
      ':userid': user.sub,
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