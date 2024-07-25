import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'

const CourseContainer = () => {
  const { slug } = useParams()
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      with: { _type: { Course: { slug: slug } } },
      preview: false,
      previewId: "00000000-0000-0000-0000-000000000000",
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the course: ${error.message}`}</p>
    )
  }

  if (!data?.Get?.Record) {
    return <NotFound />
  }

  return (
    <>
      <Course course={data?.Get?.Record?.View?.PageEntry?.data} />
    </>
  )
}

export default CourseContainer
