import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  from,
  ApolloLink,
} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { print } from 'graphql/language/printer'

const version = process.env.REACT_APP_VERSION

const persistedLink = createPersistedQueryLink({
  generateHash: async (schema: DocumentNode) => {
    return await sha256(print(schema))
  },
  useGETForHashedQueries: true,
})

const headersLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      // also added to access-control-allow-headers in Brightspot
      'X-App-Version': version,
    },
  }))
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
})

const finalLink = from([headersLink, persistedLink, httpLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: finalLink,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
