import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    'X-Client-ID': process.env.GRAPHQL_CLIENT_ID!,
    'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET!,
  },
})

export default client
