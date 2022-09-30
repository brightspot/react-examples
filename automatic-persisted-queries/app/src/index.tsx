import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  DocumentNode,
  from,
} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { onError } from '@apollo/client/link/error'
import { sha256, sha1, sha512 } from 'crypto-hash'

import { print } from 'graphql/language/printer'

const hashType = sessionStorage.getItem('hash-type')
sessionStorage.removeItem('initial-error') // reset initial error "PersistedQueryNotFound" on render

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let firstTimeError = ''
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === 'PersistedQueryNotFound') {
        firstTimeError = 'PersistedQueryNotFound'
      }
    })
  if (firstTimeError) {
    sessionStorage.setItem('initial-error', firstTimeError)
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

let result = ''

const persistedQueriesLink = createPersistedQueryLink({
  generateHash: async (schema: DocumentNode) => {
    const secret = process.env.REACT_APP_HASH_SECRET!
    const message = secret.concat(print(schema))
    result =
      hashType === 'Sha-256'
        ? await sha256(message)
        : hashType === 'Sha-1'
        ? await sha1(message)
        : hashType === 'Sha-512'
        ? await sha512(message)
        : await sha256(message)
    window.sessionStorage.setItem('hash', result)
    return result
  },
  useGETForHashedQueries: true,
})

const customLink = new ApolloLink((operation, forward) => {
  if (hashType === 'Sha-256') {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha256Hash: result,
      },
    }
  } else if (hashType === 'Sha-1') {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha1Hash: result,
      },
    }
  } else if (hashType === 'Sha-512') {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha512Hash: result,
      },
    }
  }
  sessionStorage.setItem(
    'method',
    operation.getContext().fetchOptions.method || 'POST'
  )
  return forward(operation)
})

const additiveLink = from([customLink, errorLink, httpLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink.concat(additiveLink),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
