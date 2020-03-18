//@flow
import axios from 'axios'

export type AuthClientOptions = {
  airlock_endpoint: string,
  api_endpoint: string
}

export default class auth_client {
  airlock_endpoint: string
  api_endpoint: string
  airlock_client: any
  api_client: any

  constructor(options: AuthClientOptions) {
    this.airlock_endpoint = options.airlock_endpoint
    this.api_endpoint = options.api_endpoint
    this.airlock_client = axios.create({
      baseURL: this.airlock_endpoint,
      withCredentials: true
    })
    this.api_client = axios.create({
      baseURL: this.api_endpoint,
      withCredentials: true
    })
  }

  async login(options: {
    username: string,
    password: string,
    redirect_url: string
  }) {
    await this.airlock_client.get('/airlock/csrf-cookie', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })

    await this.airlock_client.post('/login', {
      email: 'nickhellemans93@gmail.com',
      password: 'admin'
    })
    // TODO check what happens if credentials are wrong
    // window.location.assign(options.redirect_url)
    return true
  }

  async get_user() {
    let user = null

    await this.api_client
      .get('/user')
      .then(response => {
        if (response.status === 200) {
          user = response.data
        }
      })
      .catch(error => {
        user = null
        if (error.response.status === 401) {
          console.log('User is unauthenticated')
        }
      })

    return user
  }

  async is_authenticated() {
    const user = await this.get_user()
    return !!user
  }

  logout(options: { redirect_url: string }) {
    console.log(options.redirect_url)
  }
}
