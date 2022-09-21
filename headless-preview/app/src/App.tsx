import { Outlet } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Navbar } from './components/Navbar'
import './App.css'

const GET_COURSES = gql`
  query getAllCourses {
    Courses {
      courses {
        slug
        title
      }
    }
  }
`

function App() {
  const { data, error, loading } = useQuery(GET_COURSES)
  if (loading) return <div className="loading">Loading...</div>
  if (error) console.log(error.message)
  return (
    <>
      <Navbar courses={data?.Courses?.courses} />
      {error && (
        <p className="error">{`There was an error fetching data for courses: ${error}`}</p>
      )}
      <Outlet />
    </>
  )
}

export default App
