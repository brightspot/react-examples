import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Article from './components/Article'
import DynamicContainer from './components/DynamicContainer'
import Home from './components/Home'
import NotFound from './components/NotFound'
import RoutingProvider from './components/RoutingContext'
import Section from './components/Section'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  cache: new InMemoryCache(),
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <RoutingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            {/* Routing Option 1*/}
            <Route path=":content" element={<DynamicContainer />} />
            <Route path=":section/:content" element={<DynamicContainer />} />
            {/* Routing Option 2*/}
            <Route path="section/:section" element={<Section />} />
            <Route
              path="section/:section/article/:article"
              element={<Article />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoutingProvider>
  </ApolloProvider>
)
