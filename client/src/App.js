import React from 'react'
import { BrowserRouter,  Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import PrivateRoute from './PrivateRoute'
import ContactDashboard from './components/ContactDachboard'


const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/contact/:guestProfile_id' component={ContactDashboard} />
      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
