import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})
