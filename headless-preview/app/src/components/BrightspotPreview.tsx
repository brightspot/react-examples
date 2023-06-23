import { useQuery } from '@apollo/client'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'
import GET_INSTRUCTOR from '../queries/GetInstructor'
import PreviewBanner from './PreviewBanner'
import Instructor from './Instructor'

type Props = {
  contentType: string
}

const BrightspotPreview = ({ contentType }: Props) => {
  const previewId = new URLSearchParams(window.location.search).get('previewId')
  const previewType = new URLSearchParams(window.location.search).get(
    'typename'
  )

  const queryType = contentType === 'instructor' ? GET_INSTRUCTOR : GET_COURSE

  const { data, loading, error } = useQuery(queryType, {
    variables: {
      preview: {
        id: previewId,
      },
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the course: ${error.message} `}</p>
    )
  }

  if (
    (contentType === 'course' && !data?.Course) ||
    (contentType === 'instructor' && !data.Instructor)
  ) {
    return <NotFound />
  }

  return (
    <>
      {previewId && previewType && (
        <PreviewBanner
          previewId={previewId}
          previewType={previewType}
          endpointId={data.HeadlessPreviewEndpoint.id}
        />
      )}
      {contentType === 'course' ? (
        <Course course={data.Course} />
      ) : contentType === 'instructor' ? (
        <Instructor instructor={data.Instructor} />
      ) : (
        <div>No Content</div>
      )}
    </>
  )
}

export default BrightspotPreview
