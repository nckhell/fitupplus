//@flow
import React from 'react'
import { BrowserRouter as Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'

export const ProtectedRoute = ({ children, ...rest }) => {
  const { is_authenticated } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        is_authenticated ? children : <Redirect to="/login" />
      }
    />
  )
}
