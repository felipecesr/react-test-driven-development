require('dotenv').config()
const fetch = require('node-fetch')

module.exports = async (query, variables) => {
  const result = await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`
    },
    body: JSON.stringify({ query, variables })
  }).then((res) => res.json())

  return result
}
