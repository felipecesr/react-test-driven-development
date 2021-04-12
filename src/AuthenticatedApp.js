import { Route, Switch } from 'react-router-dom'
import Navigation from 'components/Navigation'
import Home from 'pages/Home'
import Form from 'pages/Form'

const AuthenticatedApp = () => (
  <>
    <Navigation />
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/new'>
        <Form />
      </Route>
    </Switch>
  </>
)

export default AuthenticatedApp
