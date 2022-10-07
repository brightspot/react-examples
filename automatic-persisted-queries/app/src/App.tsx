import './App.css'
import { SetStateAction, useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { print } from 'graphql/language/printer'

function App() {
  const [queryName, setQueryName] = useState('GetItem')

  const GET_ITEM = gql`
  query ${queryName}($title: String) {
    ApqItem(model: { title: $title }) {
      title
      body
    }
  }
`

  console.log(print(GET_ITEM))
  const [getItem, { loading, error, data }] = useLazyQuery(GET_ITEM, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    variables: {
      // change the title to that of your ApqItem if it is not 'Hello'
      title: 'Hello',
    },
  })

  useEffect(() => {
    console.log('running useEffect, ', queryName)
    getItem()
  }, [])

  if (loading) return <div>Loading...</div>

  const hashedValue = sessionStorage.getItem('hash')
  const method = sessionStorage.getItem('method')
  const firstTimeError = sessionStorage.getItem('initial-error')

  const methodExplanation = () => {
    if (method === 'POST' && !error) {
      return 'POST because this is the first time sending the query hash'
    } else if (method === 'GET' && !error) {
      return 'GET successful because the server correctly identified the hash'
    } else if (method === 'GET' && error) {
      return 'GET but an error occurred'
    } else if (method === 'POST' && error) {
      return 'POST and an error occured'
    }
  }

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    sessionStorage.removeItem('initial-error') // need to reset initial error here in case index.tsx does not get rerendered, which happens on input onChange
    setQueryName(e.target.value)
    getItem()
  }

  return (
    <div className="App">
      <article className="card">
        <select
          name="hash"
          onChange={(e) => {
            sessionStorage.setItem('hash-type', e.target.value)
            window.location.reload()
          }}
          defaultValue={sessionStorage?.getItem('hash-type') || 'Sha-256'}
        >
          <option value="Sha-512">Sha-512</option>
          <option value="Sha-256">Sha-256</option>
          <option value="Sha-1">Sha-1</option>
        </select>
        <label>
          Add title here:
          <input defaultValue={queryName} onChange={handleChange} />
        </label>
        <div
          className="error-container"
          data-color={
            error && firstTimeError
              ? 'red'
              : firstTimeError && !error
              ? 'green'
              : null
          }
        >
          {firstTimeError && (
            <p>
              <span className="label">First render warning: </span>
              {firstTimeError}
            </p>
          )}
          {error && (
            <p>
              <span className="label">Error: </span>
              {error.message}
            </p>
          )}
        </div>
        <h1 className="title">{data?.ApqItem?.title}</h1>
        <h2 className="body">{data?.ApqItem?.body}</h2>
        <p className="label">Method:</p>
        <p>{methodExplanation()}</p>
        <p className="label">Hash:</p>
        <p>{hashedValue}</p>
      </article>
      <pre>{print(GET_ITEM)}</pre>
    </div>
  )
}

export default App
