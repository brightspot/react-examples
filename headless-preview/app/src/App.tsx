import { Outlet } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Navbar } from './components/Navbar'
import './App.css'
import GET_COURSES_BASIC from './queries/GetAllCoursesBasic'

function App() {
  const { data, error, loading } = useQuery(GET_COURSES_BASIC)
  if (loading) return <div className="loading">Loading...</div>

  if (error) console.log(error.message)

  return (
    <>
      <Navbar courses={data?.AllCourses?.courses} />
      {error && (
        <p className="error">{`There was an error fetching data for courses: ${error}`}</p>
      )}
      <Outlet />
    </>
  )
}

export default App
