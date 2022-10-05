import './App.css'
import { useQuery, gql } from '@apollo/client'

// const BOGUS_QUERY = gql`
// query GetItem($title: String = "hello") {
//   SpqItem(model: {title: $title}) {
//     body
//   }
// }
// `
const GOOD_QUERY = gql`
  query GetItem($title: String = "hello") {
    SpqItem(model: { title: $title }) {
      title
      body
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(GOOD_QUERY)
  if (loading) return <div>Loading</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)
  return <div className="App">Hello There</div>
}

export default App
