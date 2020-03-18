//@flow
import auth_client, { type AuthClientOptions } from './auth_client'

export default async function create_auth_client(options: AuthClientOptions) {
  return new auth_client(options)
}

export { auth_client }
