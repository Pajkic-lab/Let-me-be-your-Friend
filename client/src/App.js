import React from 'react'
import { BrowserRouter,  Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
