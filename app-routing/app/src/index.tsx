import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Article from './components/Article'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Section from './components/Section'
import Tag from './components/Tag'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  cache: new InMemoryCache(),
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="sections/:section" element={<Section />} />
          <Route path="sections/:section/:article" element={<Article />} />
          <Route path="tags/:tag" element={<Tag />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
