import './App.css'
import { Outlet } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
