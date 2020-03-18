import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export type LoginType = {
  email: string,
  password: string
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
        login: async ({ email, password }: LoginType) => {
          set_errors(null)
          await airlock_client
            .get('/airlock/csrf-cookie', {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              withCredentials: true
            })
            .then(() => {
              return airlock_client
                .post('/login', { email, password })
                .then(response => {
                  console.log(response)
                  set_user(response.data)
                  set_is_authenticated(true)
                })
                .catch(err => {
                  const key = Object.keys(err.response.data.errors)[0]
                  set_errors(err.response.data.errors[key][0])
                })
            })
            .catch(err => {
              set_errors(err.response)
            })
        },
        logout: async () => {
          is_loading(true)
          return airlock_client
            .post('/logout')
            .then(() => {
              set_user(null)
              set_is_authenticated(false)
              is_loading(false)
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
