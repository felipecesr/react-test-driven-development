import { processToken } from 'utils'

async function getToken({ username, password }) {
  const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=password&username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
  })
  const data = await response.json()

  return data.access_token
}

async function getUser(token) {
  let user = null

  if (token) {
    const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()

    user = data.user_metadata
  }

  return {
    token,
    userInfo: user,
    expiresAt: processToken(token)
  }
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('expiresAt')
  localStorage.removeItem('userInfo')
}

export { getToken, getUser, logout }
