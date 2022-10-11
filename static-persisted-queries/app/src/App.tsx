import './App.css'
import { useGetSpqItemQuery } from './generated'

function App() {
  const { data, loading, error } = useGetSpqItemQuery({
    variables: {
      title: 'Brightspot',
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
