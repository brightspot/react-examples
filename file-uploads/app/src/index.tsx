import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    'X-Client-ID': process.env.REACT_APP_CLIENT_ID!,
    'X-Client-Secret': process.env.REACT_APP_CLIENT_SECRET!,
  },
}) as unknown as ApolloLink

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
