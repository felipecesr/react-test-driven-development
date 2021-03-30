import { Route, Switch } from 'react-router-dom'
import Navigation from 'components/Navigation/Navigation'
import Home from 'pages/Home/Home'
import Form from 'pages/Form/Form'

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
