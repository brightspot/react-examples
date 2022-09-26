import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  DocumentNode,
} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256, sha1 } from 'crypto-hash'
import crypto from 'crypto'

import { print } from 'graphql/language/printer'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  includeExtensions: true,
})

const persistedQueriesLink = createPersistedQueryLink({
  // sha256,
  generateHash: async (schema: DocumentNode) => {
    console.log(print(schema))
    const result = await sha256(print(schema))
    console.log('result', result)
    return result
  },
  useGETForHashedQueries: true,
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  link: persistedQueriesLink.concat(httpLink),
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
