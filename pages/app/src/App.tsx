import { Outlet } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Navbar from './components/Navbar'
import './App.css'

const GET_PAGES = gql`
  query getAllPages {
    Pages {
      pages {
        title
      }
    }
  }
`

function App() {
  const { data, error, loading } = useQuery(GET_PAGES)
  if (error) console.log(error)
  if (loading) return <div>Loading</div>
  return (
    <>
      <Navbar pages={data?.Pages?.pages} />
      <Outlet />
    </>
  )
}

export default App
