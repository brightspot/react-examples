import { Route, Routes, NavLink } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import NotFound from './components/NotFound'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/pages/:page">Home</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/pages/:page" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
