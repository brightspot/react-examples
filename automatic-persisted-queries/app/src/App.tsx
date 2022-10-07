import './App.css'
import { useQuery } from '@apollo/client'
import { print } from 'graphql/language/printer'
import GET_ITEM from './GetItem'

function App() {
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: {
      // change the title to that of your ApqItem if it is not 'Brightspot'
      title: 'Brightspot',
    },
  })

  if (loading) return <div>Loading...</div>

  const hashedValue = sessionStorage.getItem('hash')
  const method = sessionStorage.getItem('method')

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
        <div>
          {error && (
            <p>
              <span className="label">Error:</span>
              {error.message}
            </p>
          )}
        </div>
        {data?.ApqItem && (
          <>
            <h1 className="title">{data?.ApqItem?.title}</h1>
            <h2 className="body">{data?.ApqItem?.body}</h2>
          </>
        )}

        <p className="label">Method:</p>
        <p>{method}</p>
        <p className="label">Hash:</p>
        <p>{hashedValue}</p>
        <pre>{print(GET_ITEM)}</pre>
      </article>
    </div>
  )
}

export default App
