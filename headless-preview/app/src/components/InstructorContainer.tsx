import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import GET_INSTRUCTOR from '../queries/GetInstructor'
import Instructor from './Instructor'

const InstructorContainer = () => {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_INSTRUCTOR, {
    variables: {
      slug: slug,
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the instructor: ${error.message}`}</p>
    )
  }

  if (!data?.Instructor) {
    return <NotFound />
  }

  return (
    <>
      <Instructor instructor={data.Instructor} />
    </>
  )
}

export default InstructorContainer
