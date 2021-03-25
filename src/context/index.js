import { BrowserRouter as Router } from 'react-router-dom'
// import { IdentityContextProvider } from 'react-netlify-identity'
import { AuthProvider } from './AuthContext'

const AppProviders = ({ children }) => (
  <AuthProvider>
    <Router>{children}</Router>
  </AuthProvider>
)

export default AppProviders
