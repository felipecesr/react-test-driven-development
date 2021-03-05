import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import GlobalStyles from 'styles/global'
import Home from 'pages/Home/Home'
import Form from 'pages/Form/Form'
import Error from 'pages/Error/Error'
import store from 'store'

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/new' component={Form} />
          <Route component={Error} />
        </Switch>
      </Provider>
    </>
  )
}

export default App
