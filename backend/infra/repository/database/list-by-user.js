const listByUser = client => async userid => {
  const params = {
    TableName: 'shopping',
    KeyConditionExpression: 'pk = :userid and begins_with(sk, :todokey)',
    ExpressionAttributeValues: {
      ':userid': userid,
      ':todokey': 'todo#'
    }
  }
  const { Items } = await client.query(params)
  return Items
}

module.exports = { listByUser }
