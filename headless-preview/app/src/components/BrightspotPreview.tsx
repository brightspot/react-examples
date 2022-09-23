import { useQuery } from '@apollo/client'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'
import PreviewBanner from './PreviewBanner'

const BrightspotPreview = () => {
  const previewId = new URLSearchParams(window.location.search).get('previewId')
  const previewType = new URLSearchParams(window.location.search).get(
    'typename'
  )

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      id: previewId,
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (!data?.Course) {
    return <NotFound />
  }
  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the course: ${error.message} `}</p>
    )
  }

  return (
    <>
      {previewId && previewType && (
        <PreviewBanner previewId={previewId} previewType={previewType} />
      )}
      <Course course={data.Course} />
    </>
  )
}

export default BrightspotPreview
