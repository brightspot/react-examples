import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => (
  <div className="app">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default App
