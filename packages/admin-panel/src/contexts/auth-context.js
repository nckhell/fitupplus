import React, { Component, createContext, useContext } from 'react'
import create_auth_client from '../services/auth'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export class AuthProvider extends Component {
  state = {
    auth_client: null,
    is_loading: true,
    is_authenticated: false,
    user: null
  }

  config = {
    airlock_endpoint: process.env.AIRLOCK_AUTH_DOMAIN,
    api_endpoint: process.env.API_DOMAIN
  }

  componentDidMount() {
    this.initializeAuth()
  }

  initializeAuth = async () => {
    const auth_client = await create_auth_client(this.config)
    const is_authenticated = await auth_client.is_authenticated()
    const user = is_authenticated ? await auth_client.get_user() : null

    this.setState({
      auth_client,
      is_loading: false,
      is_authenticated,
      user
    })
  }

  render() {
    const { auth_client, is_loading, is_authenticated, user } = this.state
    const { children } = this.props

    const config_object = {
      is_loading,
      is_authenticated,
      user,
      login: (...p) => auth_client.login(...p),
      logout: (...p) => auth_client.logout(...p)
    }

    return (
      <AuthContext.Provider value={config_object}>
        {children}
      </AuthContext.Provider>
    )
  }
}
