import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import NotFound from '../NotFound'
import underline from '../../images/underline.png'

const GET_COURSE = gql`
  query GetCourse($id: ID, $slug: String) {
    Course(model: { slug: $slug, id: $id }) {
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
  const { slug } = useParams()

  const previewId = new URLSearchParams(window.location.search).get('previewId')
  const previewType = new URLSearchParams(window.location.search).get(
    'typename'
  )
  const deviceWidth = new URLSearchParams(window.location.search).get(
    'deviceWidth'
  )

  const variable = previewId != null ? { id: previewId } : { slug: slug }

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: variable,
  })
  if (loading) return <h3 className="loading">Loading...</h3>

  if (!data?.Course) {
    return <NotFound />
  }

  return (
    <>
      <div className="preview-information" data-preview={previewId || null}>
        <span className="preview-text">previewId: </span>
        <span>{`${previewId}`}</span>
        <br />
        <span className="preview-text">previewType: </span>
        <span>{`${previewType}`}</span>
        <br />
        <span className="preview-text">deviceWidth: </span>
        <span>{`${deviceWidth}`}</span>
        <br />
        <a
          href="http://localhost/_debug/query"
          rel="noreferrer"
          target="_blank"
        >
          <span className="preview-link">Debug Tool</span>
        </a>
      </div>
      <div className="course-container">
        <h1 className="course-title">{data?.Course?.title}</h1>
        <img src={underline} alt="underline" />
        <h2>{data?.Course?.subtitle}</h2>
        <div className="course-subject-age-container">
          <span className="course-subject-age with-margin">
            {data?.Course?.ageRange}
          </span>
          <span className="course-subject-age">{data?.Course?.subject}</span>
        </div>
        <p className="course-description">{data?.Course?.description}</p>

        {error && (
          <p className="error">{`There was an error fetching data for the course: ${error} `}</p>
        )}
      </div>
    </>
  )
}

export default Course
