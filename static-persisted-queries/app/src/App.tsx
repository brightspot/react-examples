import './App.css'
import { useGetSpqItemsQuery } from './generated'

function App() {
  const { data, loading, error } = useGetSpqItemsQuery()

  if (error) return <div>Error: {error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className="App">
      <h1>Static Persisted Queries</h1>
      <div className="contentWrapper">
        <h4 className="whitelistLabel">
          Whitelist Version Used:{' '}
          <span>
            {data?.SpqItems?.whitelistVersionUsed || 'no whitelist used'}
          </span>
        </h4>
        <ul>
          {data?.SpqItems?.spqItems?.map((item, i: number) => (
            <li key={i}>
              <h4>{item?.title}</h4>
              <p>{item?.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
