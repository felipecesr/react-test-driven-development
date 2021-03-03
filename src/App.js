import { Switch, Route } from 'react-router-dom'
import GlobalStyles from 'styles/global'
import Home from 'pages/Home/Home'
import Form from 'pages/Form/Form'
import NotFound from 'pages/NotFound/NotFound'

function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/new' component={Form} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App
