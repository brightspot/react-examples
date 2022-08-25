import { useState } from 'react'

const HelloQuery = `
query HelloGraphqlReact($id: ID) {
  HelloGraphqlReact(id: $id) {
    title
    description
  }
}
`

type HelloData = {
  title?: string | null
  description?: string | null
}

type HelloResponse = {
  helloData?: HelloData
  error?: string | null
}

const HelloGraphqlReact = () => {
  const [helloResponse, setHelloResponse] = useState<HelloResponse>()
  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const fetchAndSetContent = (input: string) => {
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HelloQuery,
        variables: {
          id: `${input}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.HelloGraphqlReact) {
          setHelloResponse({
            helloData: {
              title: data.data.HelloGraphqlReact.title,
              description: data.data.HelloGraphqlReact.description,
            },
          })
        } else if (data.errors) {
          throw new Error('check the network response for errors')
        } else if (!data.errors && !data?.data?.HelloGraphqlReact) {
          setHelloResponse({
            helloData: {
              title: null,
              description: null,
            },
            error: null,
          })
        }
      })
      .catch((error: Error) => {
        setHelloResponse({
          error: error.message,
        })
      })
  }

  return (
    <div className="container">
      <div className="input-wrapper">
        <label htmlFor="id-url">
          Enter your Hello GraphQL React ID or URL:
        </label>
        <input
          required
          name="id-url"
          onChange={(e) => {
            e.preventDefault()
            if (e.target.value && e.target.value.trim() !== '') {
              fetchAndSetContent(e.target.value)
            }
          }}
        />
      </div>
      {helloResponse?.helloData && (
        <div className="content-container">
          {helloResponse.helloData.title && (
            <h1 className="content-text">{helloResponse.helloData.title}</h1>
          )}
          {helloResponse.helloData.description && (
            <h3 className="content-text">
              {helloResponse.helloData.description}
            </h3>
          )}
        </div>
      )}
      {helloResponse?.error && <p className="error">{helloResponse.error}</p>}
    </div>
  )
}

export default HelloGraphqlReact
