import { Route, Switch } from 'react-router-dom'
import Login from 'pages/Login/Login'
import NoMatch from 'pages/NoMatch/NoMatch'

const UnauthenticatedApp = () => (
  <Switch>
    <Route exact path='/'>
      <Login />
    </Route>
    <Route path='*'>
      <NoMatch />
    </Route>
  </Switch>
)

export default UnauthenticatedApp
