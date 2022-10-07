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
import { sha256, sha1, sha512 } from 'crypto-hash'
import { print } from 'graphql/language/printer'

enum HashType {
  SHA256 = 'Sha-256',
  SHA1 = 'Sha-1',
  SHA512 = 'Sha-512',
}

let hashType = sessionStorage.getItem('hash-type') || 'Sha-256'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
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
  /* the default key name is sha256Hash in the persistedQuery object
  if another hash type  than SHA-256 is used, this key name must be changed
  a check for either sha256Hash or the other hashKey is needed because of the way Apollo rerenders */
  if (hashType === HashType.SHA1) {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha1Hash: operation.extensions.persistedQuery.sha256Hash
          ? operation.extensions.persistedQuery.sha256Hash
          : operation.extensions.persistedQuery.sha1Hash,
      },
    }
  } else if (hashType === HashType.SHA512) {
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha512Hash: operation.extensions.persistedQuery.sha256Hash
          ? operation.extensions.persistedQuery.sha256Hash
          : operation.extensions.persistedQuery.sha512Hash,
      },
    }
  }

  sessionStorage.setItem(
    'method',
    operation.getContext().fetchOptions.method || 'POST'
  )
  return forward(operation)
})

const additiveLink = from([customLink, httpLink])

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
