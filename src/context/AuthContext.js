import { createContext, useContext, useState } from 'react'
import GoTrue from 'gotrue-js'

const auth = new GoTrue({
  APIUrl: process.env.REACT_APP_API_URL,
  audience: '',
  setCookie: false
})

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token')
    const expiresAt = localStorage.getItem('expiresAt')
    const userInfo = localStorage.getItem('userInfo')

    return {
      token,
      expiresAt,
      userInfo: userInfo ? JSON.parse(userInfo) : {}
    }
  })

  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expiresAt', expiresAt)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    setAuthState({
      token,
      expiresAt,
      userInfo
    })
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false
    }

    return new Date().getTime() / 1000 < authState.expiresAt
  }

  const value = {
    auth,
    authState,
    setAuthState: authInfo => setAuthInfo(authInfo),
    isAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
