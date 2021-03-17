import { Switch, Route } from 'react-router-dom'
import GlobalStyles from 'styles/global'
import Home from 'pages/Home/Home'
import Form from 'pages/Form/Form'
import NoMatch from 'pages/NoMatch/NoMatch'
import Login from 'pages/Login/Login'

const App = () => (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/new'>
        <Form />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='*'>
        <NoMatch />
      </Route>
    </Switch>
  </>
)

export default App
