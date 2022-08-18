import App from './app';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider,InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  credentials: 'same-origin',
  headers: {
    'X-Client-ID': process.env.REACT_APP_GRAPHQL_CLIENT_ID,
    'X-Client-Secret': process.env.REACT_APP_GRAPHQL_CLIENT_SECRET
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
