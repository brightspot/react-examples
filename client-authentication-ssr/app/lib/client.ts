import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.GRAPHQL_URL,
    headers: {
      'X-Client-ID': process.env.GRAPHQL_CLIENT_ID,
      'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET,
    },
  }),
  cache: new InMemoryCache(),
})
