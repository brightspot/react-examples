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
  if (error)
    return (
      <div className="hello-world-message">{`Error! ${error.message}`}</div>
    )

  const hashedValue = sessionStorage.getItem('hash')
  const secret = sessionStorage.getItem('secret')

  return (
    <div className="App">
      <h1>Automatic Persisted Query</h1>
      <h2>Foo: {data?.Foo?.foo}</h2>
      <h3>
        <b>Body: </b>
        {data?.Foo?.body}
      </h3>
      <p>
        <b>Query: </b>
        {print(GET_FOO)}
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
