import './App.css'
import { useMyQueryQuery } from './generated'

function App() {
  const { data, loading, error } = useMyQueryQuery({
    variables: {
      title: 'hello',
    },
  })
  if (error) return <div>Error: {error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className="App">
      <h1>{data?.SpqItem?.title}</h1>
      <h2>{data?.SpqItem?.body}</h2>
    </div>
  )
}

export default App
