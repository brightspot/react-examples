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
  // sha256,
  sha1,
} from 'crypto-hash'

import { print } from 'graphql/language/printer'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
})

let result = ''
let secret = ''

const persistedQueriesLink = createPersistedQueryLink({
  // sha256,
  // generateHash: generatCustomHash(query),
  generateHash: async (schema: DocumentNode) => {
    secret = process.env.REACT_APP_HASH_SALT!
    window.sessionStorage.setItem('secret', secret)
    const message = secret.concat(print(schema))
    result = await sha1(message)
    window.sessionStorage.setItem('hash', result)
    return result
  },
  useGETForHashedQueries: true,
})

const customLink = new ApolloLink((operation, forward) => {
  operation.extensions = {
    persistedQuery: {
      version: 1,
      sha1Hash: result,
    },
  }
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
