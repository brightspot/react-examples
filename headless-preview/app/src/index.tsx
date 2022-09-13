import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Course from './components/Course'
import Courses from './components/Courses'
import NotFound from './components/NotFound'
import Home from './components/Home'


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
          <Route path="/courses" element={<Courses />}/>
          <Route path="/courses/:slug" element={<Course />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
