import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import NotFound from '../NotFound'
import underline from '../../images/underline.png'

const GET_COURSE = gql`
query GetCourse($id: ID, $slug: String) {
  Course(model: {slug: $slug, id: $id}) {
    title
    subtitle
    slug
    description
    ageRange
    subject
  }
}
`
const Course = () => {
  console.log('YOU ARE HERE')
  const { slug } = useParams()
console.log({ slug })
  const previewId = new URLSearchParams(window.location.search).get('previewId')
  const previewType = new URLSearchParams(window.location.search).get('typename')
  const deviceWidth = new URLSearchParams(window.location.search).get('deviceWidth')
  console.log('PREVIEW TYPE', previewType)
  console.log('DEVICE WIDTH: ', deviceWidth)

  const variable = previewId != null ? { id: previewId } : { slug: slug }
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
      <p>{data?.Course?.description}</p>
      <p>{data?.Course?.ageRange}</p>
      <p>{data?.Course?.subject}</p>
      <p></p>
      {error && (
        <p className="error">{`There was an error fetching data for the course: ${error} `}</p>
      )}
    </div>
  )
}

export default Course
