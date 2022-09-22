import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Courses from './components/Courses'
import NotFound from './components/NotFound'
import BrightspotPreview from './components/BrightspotPreview'
import AppView from './components/AppView'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
  cache: new InMemoryCache(),
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const previewId = new URLSearchParams(window.location.search).get(
  'previewId'
)
export const previewType = new URLSearchParams(window.location.search).get(
  'typename'
)

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Courses />} />
          <Route path="courses/:slug" element={<AppView />} />
          <Route
            path="courses/brightspot-preview"
            element={
              previewId && previewType ? (
                <BrightspotPreview
                  previewId={previewId}
                  previewType={previewType}
                />
              ) : (
                <NotFound />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
