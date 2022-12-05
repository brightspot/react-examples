import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

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
  defaultOptions: defaultOptions
})
