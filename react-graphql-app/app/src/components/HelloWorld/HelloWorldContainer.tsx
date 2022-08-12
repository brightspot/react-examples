import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useState, useEffect } from 'react'

const HelloWorldContainer = () => {
  const [error, setError] = useState('')
  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const [helloWorldContent, setHelloWorldContent] = useState({
    HelloWorld: {
      title: '',
      text: '',
    },
  })

  useEffect(() => {
    fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HelloWorldQuery,
        variables: {
          path: '/hello-world',
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => setHelloWorldContent(res.data))
      .catch((error: Error) => {
        console.log(error.message)
        setError(error.message)
      })
  }, [GRAPHQL])

  if (error) return <div className="hello-world-message">{error}</div>
  return (
    <div className="hello-world-container">
      <HelloWorld helloWorldContent={helloWorldContent} />
    </div>
  )
}

export default HelloWorldContainer
