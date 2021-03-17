import { createContext, useContext } from 'react'

const initialValue = {
  user: {
    user_metadata: {
      full_name: 'Felipe César'
    },
    token: '12345'
  },
  loginUser: jest.fn(),
  signupUser: jest.fn(),
  logoutUser: jest.fn()
}

const IdentityContext = createContext()

const IdentityContextProvider = ({ children }) => {
  return (
    <IdentityContext.Provider value={initialValue}>
      {children}
    </IdentityContext.Provider>
  )
}

const useIdentityContext = () => useContext(IdentityContext)

export { IdentityContextProvider, useIdentityContext }
