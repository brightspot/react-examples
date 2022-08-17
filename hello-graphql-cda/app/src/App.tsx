import './App.css'
import { useState } from 'react'
import HelloWorldContainer from './components/HelloWorld/HelloWorldContainer'

function App() {
  const [helloWorldContent, setHelloWorldContent] = useState({
    title: '',
    text: '',
  })
  return (
    <div className="App">
      <HelloWorldContainer
        helloWorldContent={helloWorldContent}
        setHelloWorldContent={setHelloWorldContent}
      />
    </div>
  )
}

export default App
