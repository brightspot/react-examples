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

type HelloError = {
  isError: boolean
  message: string
}

const HelloGraphqlReact = () => {
  const [error, setError] = useState({} as HelloError)
  const [helloContent, setHelloContent] = useState({} as HelloData)

  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const fetchandSetContent = (input: string) => {
    fetch(GRAPHQL, {
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
          setHelloContent({
            title: data.data.HelloGraphqlReact.title,
            description: data.data.HelloGraphqlReact.description,
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
          Enter your Hello GraphQL React ID or URL:
        </label>
        <input
          required
          name="permalink-id"
          maxLength={30}
          onChange={(e) => {
            e.preventDefault()
            setError({ isError: false, message: '' })
            setHelloContent({ title: '', description: '' })
            if (e.target.value && e.target.value.trim() !== '') {
              fetchandSetContent(e.target.value)
            }
          }}
        />
      </div>
      {helloContent.title && (
        <div className="content-container">
          <h1 className="content-text">{helloContent.title}</h1>
          <h3 className="content-text">{helloContent.description}</h3>
        </div>
      )}
      {error.isError && <p className="error">{error.message}</p>}
    </div>
  )
}

export default HelloGraphqlReact
