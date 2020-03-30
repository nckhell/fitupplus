//@flow
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'

export const ProtectedRoute = ({ children, ...props }) => {
  const { is_authenticated } = useAuth()
  return (
    <Route
      {...props}
      render={() =>
        is_authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  )
}
