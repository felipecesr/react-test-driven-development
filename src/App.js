import { Switch, Route } from 'react-router-dom'
import GlobalStyles from 'styles/global'
import Home from 'pages/Home/Home'
import Form from 'pages/Form/Form'

function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/new' component={Form} />
      </Switch>
    </>
  )
}

export default App
