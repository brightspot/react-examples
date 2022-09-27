import './App.css'
import GET_FOO from './FooQuery'
import { useQuery } from '@apollo/client'
import { print } from 'graphql/language/printer'

function App() {
  const { loading, error, data } = useQuery(GET_FOO, {
    variables: {
      foo: 'test',
    },
  })

  if (loading) return <div className="hello-world-message">Loading...</div>
 
  const hashedValue = sessionStorage.getItem('hash')
  const secret = sessionStorage.getItem('secret')
  const method = sessionStorage.getItem('method')
  return (
    <div className="App">
      <select onChange={(e) => {
        sessionStorage.setItem('hash-type', e.target.value)
        window.location.reload();
      }
    }
    defaultValue={sessionStorage?.getItem('hash-type') || ''}
    >
        <option></option>
        <option>default</option>
        <option>Sha-256</option>
        <option>Sha-1</option>
      </select>

      <select onChange={(e) => {
        sessionStorage.setItem('set-secret', e.target.value)
        window.location.reload();
      }
    }
    defaultValue={sessionStorage?.getItem('set-secret') || ''}
    >
        <option></option>
        <option>yes</option>
        <option>no</option>
      </select>
      <h1>Automatic Persisted Query</h1>
      {error && (
          <div className="hello-world-message">{`Error! ${error.message}`}</div>
      )}
      <h2>Foo: {data?.Foo?.foo}</h2>
      <h3>
        <b>Body: </b>
        {data?.Foo?.body}
      </h3>
      <p>
        <b>Method: </b>
        {method}
      </p>
      <p>
        <b>Hash: </b>
        {hashedValue}
      </p>
      <p>
        <b>Secret: </b>
        {secret}
      </p>
    </div>
  )
}

export default App
