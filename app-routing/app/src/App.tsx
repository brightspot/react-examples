import './App.css'
import { Outlet } from 'react-router-dom'
import useSessionStorage from './components/useSessionStorage'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { RoutingContext } from './components/RoutingContext'

function App() {
  const [routingOption, setRoutingOption] = useSessionStorage<number>("routing-option", 1)
  return (
    <RoutingContext.Provider value={routingOption}>
    <div className="app">
      <Navbar />
      <main>
        <button onClick={() => setRoutingOption(1)}>routing 1</button>
        <button onClick={() => setRoutingOption(2)}>routing 2</button>
        <Outlet />
      </main>
      <Footer />
    </div>
    </RoutingContext.Provider>
  )
}

export default App
