import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL ?? '' })
const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink.concat(httpLink),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
