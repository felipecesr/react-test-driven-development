import { BrowserRouter as Router } from 'react-router-dom'
import { IdentityContextProvider } from 'react-netlify-identity'

function AppProviders({ children }) {
  const url = 'https://react-test-driven-development.netlify.app/'
  return (
    <IdentityContextProvider url={url}>
      <Router>{children}</Router>
    </IdentityContextProvider>
  )
}

export default AppProviders
