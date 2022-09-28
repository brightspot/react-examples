import './App.css'
import { useQuery } from '@apollo/client'
import GET_ITEM from './GetItem'

function App() {
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: {
      title: 'test',
    },
  })

  if (loading) return <div></div>

  const hashedValue = sessionStorage.getItem('hash')
  const method = sessionStorage.getItem('method')

  const methodExplanation = () => {
    if (method === 'POST' && !error) {
      return 'POST since this is the first time sending the query hash'
    } else if (method === 'GET' && !error) {
      return 'successful GET since the server correctly identified the hash'
    } else if (method === 'GET' && error) {
      return 'GET but an error occurred'
    } else if (method === 'POST' && error) {
      return 'POST and an error occured'
    }
  }
  return (
    <div className="App">
      <div className="slide-in">
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
          {error && <p>{`Error: ${error.message}`}</p>}
          <h2 className="title">{data?.ApqItem?.title}</h2>
          <p className="body">{data?.ApqItem?.body}</p>
          <p className="label">Method:</p>        
            <p>{methodExplanation()}</p>
            <p className="label">Hash:</p>
            <p>{hashedValue}</p>         
        </article>
      </div>
    </div>
  )
}

export default App
