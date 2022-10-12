import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Content from './components/Content'
import Home from './components/Home'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="*" element={<Content />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
