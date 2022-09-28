import './App.css'
import GET_ITEM from './GetItem'
import { useQuery } from '@apollo/client'

function App() {
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: {
      title: 'test',
    },
  })

  if (loading) return <div className="hello-world-message">Loading...</div>

  const hashedValue = sessionStorage.getItem('hash')
  const method = sessionStorage.getItem('method')

  const methodExplanation = () => {
    if (method === 'POST' && !error) {
      return 'method is POST since this is the first time sending the query hash'
    } else if (method === 'GET' && !error) {
      return 'method is a successful GET since the server correctly identified the hash'
    } else if (method === 'GET' && error) {
      return 'method is GET but an error occurred'
    } else if (method === 'POST' && error) {
      return 'method is POST and an error occured'
    }
  }
  return (
    <div className="App">
      <select
        onChange={(e) => {
          sessionStorage.setItem('hash-type', e.target.value)
          window.location.reload()
        }}
        defaultValue={sessionStorage?.getItem('hash-type') || ''}
      >
        <option></option>
        <option>Sha-512</option>
        <option>Sha-256</option>
        <option>Sha-1</option>
      </select>
      <h1>Automatic Persisted Query</h1>
      {error && (
        <div className="hello-world-message">{`Error: ${error.message}`}</div>
      )}
      <h2>Foo: {data?.ApqItem?.title}</h2>
      <h3>
        <b>Body: </b>
        {data?.ApqItem?.body}
      </h3>
      <p>
        <b>Method: </b>
        {methodExplanation()}
      </p>
      <p>
        <b>Hash: </b>
        {hashedValue}
      </p>
    </div>
  )
}

export default App
