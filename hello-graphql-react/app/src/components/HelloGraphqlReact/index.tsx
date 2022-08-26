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
  title?: string
  description?: string
}

type HelloResponse = {
  helloData?: HelloData
  errors?: string[]
}

const HelloGraphqlReact = () => {
  const [helloResponse, setHelloResponse] = useState<HelloResponse>()
  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const dataRequestParams = (input: string) => {
    return {
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
    }
  }

  const handleResponse = (res: any) => {
    if (res?.data?.HelloGraphqlReact) {
      setHelloResponse({
        ...handleResponse,
        helloData: {
          title: res.data.HelloGraphqlReact.title,
          description: res.data.HelloGraphqlReact.description,
        },
      })
    }
    if (res.errors) {
      let errorMessages = []
      for (let item of res.errors) {
        errorMessages.push(item.message)
      }
      setHelloResponse({
        ...handleResponse,
        errors: [...errorMessages],
      })
    }
  }

  const handleError = (error: Error) => {
    setHelloResponse({
      ...handleResponse,
      errors: [error.message],
    })
  }

  function fetchAndSetContent(input: string) {
    fetch(GRAPHQL_URL, dataRequestParams(input))
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
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
            } else {
              setHelloResponse({})
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
      {helloResponse?.errors &&
        helloResponse.errors.map((error, i) => {
          return (
            <p className="error" key={i}>
              {error}
            </p>
          )
        })}
    </div>
  )
}

export default HelloGraphqlReact
