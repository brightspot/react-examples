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

const link = createPersistedQueryLink({
  useGETForHashedQueries: true,
  sha256,
}).concat(
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  })
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
