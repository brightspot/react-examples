import './App.css'
import { useState } from 'react'
import GET_ITEM from './GetItem'
import { useQuery } from '@apollo/client'

function App() {
  const [viewDetails, setViewDetails] = useState(false)
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
      return 'Method: POST since this is the first time sending the query hash'
    } else if (method === 'GET' && !error) {
      return 'Method: successful GET since the server correctly identified the hash'
    } else if (method === 'GET' && error) {
      return 'Method: GET but an error occurred'
    } else if (method === 'POST' && error) {
      return 'Method: POST and an error occured'
    }
  }
  return (
    <div className="App">
      <div className="slide-in">
        <article className="card" data-details={viewDetails || null}>
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
          <p>{data?.ApqItem?.body}</p>
          <button onClick={() => setViewDetails(true)}>
            <span>View Details</span>
          </button>
          <div className="overlay">
            <p className="overlay-text">{methodExplanation()}</p>
            <p className="overlay-text">{`Hash: ${hashedValue}`}</p>
            <button onClick={() => setViewDetails(false)}>
              <span>Hide Details</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}

export default App
