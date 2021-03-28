import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './AuthContext'

const AppProviders = ({ children }) => (
  <Router>
    <AuthProvider>{children}</AuthProvider>
  </Router>
)

export default AppProviders
