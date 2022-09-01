import './App.css'
import { useState, useEffect } from 'react'

const HelloQuery = `\
query HelloQuery {
  HelloWorld {
    message
  }
}`

type HelloResponse = {
  message?: 'hello world'
  errors?: string[]
}

function App() {
  const [helloResponse, setHelloResponse] = useState<HelloResponse>()
  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const handleResponse = (res: any) => {
    let message
    let errors: string[] = []
    if (res?.data?.HelloWorld) {
      message = res.data.HelloWorld.message
    }
    if (res.errors) {
      for (let error of res.errors) {
        errors.push(error.message)
      }
    }
    setHelloResponse({
      message,
      errors,
    })
  }

  const handleError = (error: Error) => {
    setHelloResponse({
      errors: [error.message],
    })
  }

  useEffect(() => {
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HelloQuery,
      }),
    })
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }, [GRAPHQL_URL])

  return (
    <div className="App">
      <h1>{helloResponse?.message}</h1>
      {helloResponse?.errors?.map((error, i) => {
        return <p key={i}>{error}</p>
      })}
    </div>
  )
}

export default App
