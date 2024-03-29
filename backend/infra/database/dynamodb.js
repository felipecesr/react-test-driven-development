require('dotenv').config()
const { DynamoDB } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb')

const dbclient = new DynamoDB({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  }
})

const ddbDocClient = DynamoDBDocument.from(dbclient)

module.exports = { ddbDocClient }
