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

const HelloWorld = () => {
  const [error, setError] = useState({ isError: false, message: '' })
  const [helloWorldContent, setHelloWorldContent] = useState({
    title: '',
    description: '',
  })

  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const getHelloWorld = async (input: string) => {
    try {
      const response = await fetch(GRAPHQL, {
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
      if (!response.ok) {
        setError({
          isError: true,
          message:
            'there was a problem fetching data... ' + response.statusText,
        })
        throw new Error()
      }

      const data = await response.json()
      const helloWorldData: HelloWorldData = data?.data?.HelloWorld
      if (helloWorldData?.title && helloWorldData?.description) {
        setHelloWorldContent({
          title: helloWorldData.title,
          description: helloWorldData.description,
        })
      } else if (data.errors) {
        setError({
          isError: true,
          message: data.errors[0]?.message || 'error with graphql request',
        })
      } else {
        setHelloWorldContent({
          title: '',
          description: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (error.isError) {
    alert(error.message)
  }

  return (
    <div className="hello-world-container">
      <div className="hello-world-form">
        <label htmlFor="permalink" className="hello-world-form-text">
          Enter your Hello World GraphQL CDA ID or URL:
        </label>
        <input
          required
          name="permalink"
          className="hello-world-form-input"
          onChange={(e) => {
            e.preventDefault()
            if (e.target.value && e.target.value.trim() !== '') {
              getHelloWorld(e.target.value)
            }
          }}
        />
      </div>
      {helloWorldContent.title && helloWorldContent.description && (
        <div className="hello-world-output">
          <h1 className="hello-world-text">{helloWorldContent.title}</h1>
          <h3 className="hello-world-text">{helloWorldContent.description}</h3>
        </div>
      )}
    </div>
  )
}

export default HelloWorld
