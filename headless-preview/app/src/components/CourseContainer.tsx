import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'

const CourseContainer = () => {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      slug: slug,
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (!data?.Course) {
    return <NotFound />
  }

  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the course: ${error.message}`}</p>
    )
  }

  return (
    <>
      <Course course={data.Course} />
    </>
  )
}

export default CourseContainer
