import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export type LoginType = {
  email: string,
  password: string,
  history: any
}

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const airlock_client = axios.create({
  baseURL: process.env.AIRLOCK_AUTH_DOMAIN,
  withCredentials: true
})

const api_client = axios.create({
  baseURL: process.env.API_DOMAIN,
  withCredentials: true
})

export const AuthProvider = ({ children }) => {
  const [user, set_user] = useState(null)
  const [errors, set_errors] = useState(null)
  const [message, set_message] = useState(null)
  const [is_loading, set_loading] = useState(true)
  const [is_authenticated, set_is_authenticated] = useState(false)

  const initialize = () =>
    api_client
      .get('/user')
      .then(response => {
        set_user(response.data)
        set_is_authenticated(true)
        set_loading(false)
      })
      .catch(() => {
        set_user(null)
        set_is_authenticated(false)
        set_loading(false)
      })

  useEffect(() => {
    initialize()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        is_loading,
        is_authenticated,
        user,
        errors,
        message,
        login: async ({ email, password, history }: LoginType) => {
          set_errors(null)
          await airlock_client
            .get('/airlock/csrf-cookie', {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              withCredentials: true
            })
            .then(() => {})
            .catch(err => {
              set_errors(err.response)
            })

          return airlock_client
            .post('/login', { email, password })
            .then(response => {
              console.log(response)
              set_user(response.data)
              set_is_authenticated(true)
              history.push('/')
            })
            .catch(err => {
              const key = Object.keys(err.response.data.errors)[0]
              set_errors(err.response.data.errors[key][0])
            })
        },
        logout: async history => {
          set_loading(true)
          return airlock_client
            .post('/logout')
            .then(() => {
              set_user(null)
              set_is_authenticated(false)
              set_loading(false)
              set_message('You are succesfully logged out!')
              history.push('/login')
            })
            .catch(err => {
              console.log(err.response)
            })
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
