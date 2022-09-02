import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default App
