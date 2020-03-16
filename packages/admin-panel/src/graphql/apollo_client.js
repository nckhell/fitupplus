//@flow
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

const link = createHttpLink({
  uri: process.env.API_URL,
  credentials: 'same-origin'
})

export const apollo_client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
