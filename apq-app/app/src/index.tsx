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
import {
  sha256,
  sha1,
} from 'crypto-hash'

import { print } from 'graphql/language/printer'

const hashType = sessionStorage.getItem('hash-type')
const setSecret = sessionStorage.getItem('set-secret')
console.log({ hashType })
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
})

let result = ''
let secret = ''
// let method = ''

const persistedQueriesLink = createPersistedQueryLink({
  // sha256,
  // generateHash: generatCustomHash(query),
  generateHash: async (schema: DocumentNode) => {
    secret = process.env.REACT_APP_HASH_SALT!

    window.sessionStorage.setItem('secret', secret)
    // const message = hashType === 'default' ? print(schema): secret.concat(print(schema))
    const message = (): string | void => {
      if (setSecret === 'yes') {
        console.log('you are here in yes')
        secret.concat(print(schema))
      } else if (setSecret === 'no') {
        console.log('you are here in no')
        return print(schema)
      } else console.log('an error occurered getting the query string to hash')
    }
    result = hashType ==='Sha-256' ? await sha256(message() || '') : hashType ==='Sha-1' ? await sha1(message() || ''): hashType ==='default' ? await sha256(message() || '') : await sha256(message() || '')
    window.sessionStorage.setItem('hash', result)
    return result
  },
  useGETForHashedQueries: true,
})

const customLink = new ApolloLink((operation, forward) => {
  if (hashType === 'Sha-256') {
    console.log('HASH is 256!!!')
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha256Hash: result,
      },
    }
  } else if (hashType === 'Sha-1') {
    console.log('you are HERE!!!')
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha1Hash: result,
      },
    }
  } else if (hashType === 'default') {
    console.log('HASH is default!!!')
    operation.extensions = {
      persistedQuery: {
        version: 1,
        sha256Hash: result,
      },
    }
  }
  sessionStorage.setItem('method', operation.getContext().fetchOptions.method || 'POST')
  return forward(operation)
})

const additiveLink = from([customLink, httpLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  link: persistedQueriesLink.concat(additiveLink),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
