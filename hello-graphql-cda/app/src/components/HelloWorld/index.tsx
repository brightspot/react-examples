import { useState } from 'react'

const HelloWorldQuery = `
query HelloWorld($id: ID) {
  HelloWorld(id: $id) {
    title
    description
  }
}
`

type HelloWorldData = {
  title?: string
  description?: string
}

type ErrorData = {
  isError: boolean
  message: string
}

const HelloWorld = () => {
  const [error, setError] = useState({} as ErrorData)
  const [helloWorldContent, setHelloWorldContent] = useState(
    {} as HelloWorldData
  )

  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const fetchandSetContent = (input: string) => {
    fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HelloWorldQuery,
        variables: {
          id: `${input}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.HelloWorld) {
          setHelloWorldContent({
            title: data.data.HelloWorld.title || '',
            description: data.data.HelloWorld.description || '',
          })
        } else if (data.errors) {
          setError({
            isError: true,
            message: data.errors[0]?.message || 'an error occurred',
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <div className="input-wrapper">
        <label htmlFor="permalink">
          Enter your Hello World GraphQL CDA ID or URL:
        </label>
        <input
          required
          name="permalink"
          onChange={(e) => {
            e.preventDefault()
            setError({ isError: false, message: '' })
            setHelloWorldContent({ title: '', description: '' })
            if (e.target.value && e.target.value.trim() !== '') {
              fetchandSetContent(e.target.value)
            }
          }}
        />
      </div>
      {helloWorldContent.title && helloWorldContent.description && (
        <div className="content-container">
          <h1 className="content-text">{helloWorldContent.title}</h1>
          <h3 className="content-text">{helloWorldContent.description}</h3>
        </div>
      )}
      {error.isError && <p className="error">{error.message}</p>}
    </div>
  )
}

export default HelloWorld
