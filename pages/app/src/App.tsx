import { Outlet } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Navbar from './components/Navbar'
import './App.css'
import Footer from './components/Footer'

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
  if (loading) return <h3 className="loading">Loading...</h3>
  return (
    <>
      <Navbar pages={data?.Pages?.pages} />
      {error && (
        <p className="error">{`There was an error fetching data for pages: ${error}`}</p>
      )}
      <Outlet />
      <Footer />
    </>
  )
}

export default App
