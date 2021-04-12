import { Route, Switch } from 'react-router-dom'
import Login from 'pages/Login'
import NoMatch from 'pages/NoMatch'

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
