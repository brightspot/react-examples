import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  ApolloLink,
} from '@apollo/client'

import { sha256 } from 'crypto-hash'
import { print } from 'graphql/language/printer'
import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'

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

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL ?? '',
})

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'PersistedQueryNotFound') {
        operation.extensions.httpMethod = 'post'
      }
    })
  }
})

const persistedQueriesLink = createPersistedQueryLink({
  generateHash: async (schema: DocumentNode) => {
    const secret = process.env.SECRET_KEY!
    const message = secret.concat(print(schema))
    const result = await sha256(message)
    return result
  },
  useGETForHashedQueries: true,
})

const customLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const headers = context.response.headers
    if (headers.get('cache-control')) {
      operation.extensions.cacheControl = headers.get('cache-control')
    }
    if (headers.get('x-cache')) {
      operation.extensions.xCache = headers.get('x-cache')
    }

    if (response.data) {
      response.data.httpMethod = operation.extensions.httpMethod || 'get'
      if (operation.extensions.cacheControl) {
        response.data.cacheControl = operation.extensions.cacheControl
      }
      if (operation.extensions.xCache) {
        response.data.xCache = operation.extensions.xCache
      }
    }
    return response
  })
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink
    .concat(customLink)
    .concat(errorLink)
    .concat(httpLink),
  defaultOptions: defaultOptions,
})
