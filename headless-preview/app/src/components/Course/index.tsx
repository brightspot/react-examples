import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import NotFound from '../NotFound'
import underline from '../../images/underline.png'

const GET_COURSE = gql`
query GetCourse($id: ID, $path: String) {
  Course(model: { path: $path, id: $id }) {
    content
    title
    subtitle
    path
  }
}
`
const Course = () => {
  const { path } = useParams()
console.log({ path })
  const previewId = new URLSearchParams(window.location.search).get('previewId')

  const variable = previewId != null ? { id: previewId } : { path: path }
console.log({variable})
  /*uncomment the console.log to see how the variable is used in Brightspot and the front-end application*/
  // console.log({ variable })

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: variable,
  })
  if (loading) return <h3 className="loading">Loading...</h3>

  if (!data?.Course) {
    return <NotFound />
  }

  return (
    <div className="course-container">
      <h1 className="course-title">{data?.Course?.title}</h1>
      <img src={underline} alt="underline" />
      <h2>{data?.Course?.subtitle}</h2>
      <p>{data?.Course?.content}</p>
      {error && (
        <p className="error">{`There was an error fetching data for the course: ${error} `}</p>
      )}
    </div>
  )
}

export default Course
