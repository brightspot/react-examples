import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  ApolloLink,
  Operation,
  NextLink,
} from '@apollo/client'

import { sha256 } from 'crypto-hash'
import { print } from 'graphql/language/printer'
import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'

// Reference @apollo/client/link/http/http.cjs `serializeFetchParameter` function.
const serializeFetchParameter = (p: any, label: string) => {
  let serialized

  try {
    serialized = JSON.stringify(p)
  } catch (e: any) {
    console.log('error occured seralizing parameters: ', e)
  }
  return serialized
}

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
  generateHash: async (query: DocumentNode) => {
    const secret = process.env.SECRET_KEY!
    const message = secret.concat(print(query))
    const result = await sha256(message)
    return result
  },
  useGETForHashedQueries: true,
})

/* 
example of an Apollo Client stateful link
https://www.apollographql.com/docs/react/api/link/introduction#stateful-links
*/
class OperationCountLink extends ApolloLink {
  operationCount: number
  constructor() {
    super()
    this.operationCount = 0
  }
  request(operation: Operation, forward: NextLink) {
    if (operation.getContext().fetchOptions.method === 'GET') {
      this.operationCount = 1
    } else {
      this.operationCount = 2
    }
    if (process.env.LOGGER === 'true') {
      console.log('')
      console.log('🚀 network call: ', this.operationCount)
    }

    return forward(operation)
  }
}

const countLink = new OperationCountLink()

const customLink = new ApolloLink((operation: Operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()

    /* 
    Reference @apollo/client/link/http/http.cjs `rewriteURIForGET` function. This implementation 
    does not include logic for fragments.
    */
    if (process.env.LOGGER === 'true') {
      if (context.fetchOptions.method === 'GET') {
        const queryParams: string[] = []
        const addQueryParam = (key: string, value: any) => {
          queryParams.push(
            ''.concat(key, '=').concat(encodeURIComponent(value))
          )
        }
        if (operation.operationName) {
          addQueryParam('operationName', operation.operationName)
        }
        addQueryParam('operationName', operation.operationName)
        if (operation.variables) {
          let serializedVariables: string | undefined
          try {
            serializedVariables = serializeFetchParameter(
              operation.variables,
              'Variables map'
            )
          } catch (error) {
            console.log(error)
          }
          addQueryParam('variables', serializedVariables)
        }
        if (operation.extensions) {
          let serializedExtensions: string | undefined
          try {
            serializedExtensions = serializeFetchParameter(
              operation.extensions,
              'Extensions Map'
            )
          } catch (error) {
            console.log(error)
          }
          addQueryParam('extensions', serializedExtensions)
        }
        const url = `${process.env.GRAPHQL_URL}/?${queryParams.join('&')}`
        console.log('HTTP method: ', context.fetchOptions.method)
        console.log('request url: ', url)
        console.log('✅ response: ', response)
      } else {
        const postBody = {
          query: print(operation.query),
          variables: operation.variables,
          extensions: {
            persistedQuery: operation.extensions.persistedQuery,
          },
        }
        console.log('HTTP method: ', 'POST')
        console.log('request url: ', process.env.GRAPHQL_URL)
        console.log('POST Body: ', postBody)
        console.log('✅ response: ', response)
      }
    }

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
    .concat(countLink)
    .concat(errorLink)
    .concat(customLink)
    .concat(httpLink),
  defaultOptions: defaultOptions,
})
