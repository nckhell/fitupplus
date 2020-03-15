import React from 'react'
import { Redirect } from 'react-router-dom'
import { is_authenticated } from '../helpers/auth/is_authenticated'
import { Login } from '../components/Login'

export const LoginPage = () => {
  if (is_authenticated()) {
    return <Redirect to="/" />
  } else {
    return <Login />
  }
}
