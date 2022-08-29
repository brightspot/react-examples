import { useState } from 'react'

const HelloQuery = `
query HelloGraphqlReact($id: ID) {
  HelloGraphqlReact(id: $id) {
    name
    message
  }
}
`

type HelloData = {
  name?: string
  message?: string
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
    let helloData: HelloData | undefined
    let errors: string[] = []
    if (res?.data?.HelloGraphqlReact) {
      helloData = {
        name: res.data.HelloGraphqlReact.name,
        message: res.data.HelloGraphqlReact.message,
      }
    }
    if (res.errors) {
      for (let error of res.errors) {
        errors.push(error.message)
      }
    }
    setHelloResponse({
      helloData: helloData,
      errors: errors,
    })
  }

  const handleError = (error: Error) => {
    setHelloResponse({
      errors: [error.message],
    })
  }

  function fetchAndSetContent(input: string) {
    if (!input || input.trim() === '') {
      setHelloResponse({})
    }

    fetch(GRAPHQL_URL, dataRequestParams(input))
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }

  return (
    <div className="container">
      <div className="input-wrapper">
        <label htmlFor="id-url">Enter Your Name:</label>
        <input
          required
          name="id-url"
          onChange={(e) => {
            e.preventDefault()
            fetchAndSetContent(e.target.value)
          }}
        />
      </div>
      <div className="content-container">
        <h1 className="content-text">Hello {helloResponse?.helloData?.name}</h1>
        <h3 className="content-text">{helloResponse?.helloData?.message}</h3>
      </div>
      {helloResponse?.errors?.map((error, i) => {
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
