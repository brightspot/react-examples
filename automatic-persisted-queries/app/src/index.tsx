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

enum HashType {
  SHA256 = 'Sha-256',
  SHA1 = 'Sha-1',
  SHA512 = 'Sha-512',
}

const hashType = sessionStorage.getItem('hash-type')
sessionStorage.removeItem('initial-error') // reset initial error "PersistedQueryNotFound" on render
let firstTimeError = ''

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === 'PersistedQueryNotFound') {
        console.log('you are here in persisted query not found zone')
        firstTimeError = 'PersistedQueryNotFound'
      }
    })
  if (firstTimeError) {
    sessionStorage.setItem('initial-error', firstTimeError)
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const persistedQueriesLink = createPersistedQueryLink({
  generateHash: async (schema: DocumentNode) => {
    const secret = process.env.REACT_APP_HASH_SECRET!
    const message = secret.concat(print(schema))
    let result = ''
    if (hashType === HashType.SHA256) {
      result = await sha256(message)
    } else if (hashType === HashType.SHA1) {
      result = await sha1(message)
    } else if (hashType === HashType.SHA512) {
      result = await sha512(message)
    } else {
      console.log('no hash provided')
    }
    window.sessionStorage.setItem('hash', result)
    return result
  },
  useGETForHashedQueries: true,
})

const customLink = new ApolloLink((operation, forward) => {
  console.log(operation.extensions.persistedQuery, hashType)
  if (hashType === HashType.SHA1) {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha1Hash: operation.extensions.persistedQuery.sha256Hash
          ? operation.extensions.persistedQuery.sha256Hash
          : operation.extensions.persistedQuery.sha1Hash,
      },
    }
    console.log(operation.extensions.persistedQuery)
  } else if (hashType === HashType.SHA512) {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha512Hash: operation.extensions.persistedQuery.sha256Hash
          ? operation.extensions.persistedQuery.sha256Hash
          : operation.extensions.persistedQuery.sha512Hash,
      },
    }
    console.log(operation.extensions.persistedQuery, hashType)
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
