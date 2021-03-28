import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as auth from 'authProvider'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

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
  const history = useHistory()

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

  const login = async form => {
    try {
      const token = await auth.getToken(form)
      const user = await auth.getUser(token)

      setAuthInfo(user)
    } catch (e) {
      console.log({ e })
      throw new Error('some error')
    }
  }

  const logout = () => {
    auth.logout()

    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {}
    })

    history.push('/')
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
    isAuthenticated,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
