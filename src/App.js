import React from 'react'
import GlobalStyles from 'styles/global'
import { useAuth } from 'context/AuthContext'

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function Spinner() {
  return <div>Loading</div>
}

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<Spinner />}>
        {isAuthenticated() ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </>
  )
}

export default App
