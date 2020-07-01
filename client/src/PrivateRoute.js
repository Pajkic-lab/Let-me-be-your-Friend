import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './features/user/userSlice'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const{ isAuthenticated } = useSelector(selectUser)
    return (
        <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
    )
}

export default PrivateRoute