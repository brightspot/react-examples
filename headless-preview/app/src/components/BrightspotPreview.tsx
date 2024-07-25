import { useQuery } from '@apollo/client'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'
import PreviewBanner from './PreviewBanner'

const BrightspotPreview = () => {
  const id = new URLSearchParams(window.location.search).get('id')
  const previewId = new URLSearchParams(window.location.search).get('previewId')
  const view = new URLSearchParams(window.location.search).get('view') || ''
  const deviceWidth = new URLSearchParams(window.location.search).get('deviceWidth') || ''

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      with: {
        _id: id,
      },
      preview: true,
      previewId: previewId,
    },
  })

  if (loading) return <div className="loading">Loading...</div>

  if (error) {
    return (
      <p className="error">{`There was an error fetching data for the course: ${error.message} `}</p>
    )
  }

  if (!data?.Get?.Record?.Preview) {
    return <NotFound />
  }

  return (
    <>
      {id && previewId && (
        <PreviewBanner
          id={id}
          previewId={previewId}
          view={view}
          deviceWidth={deviceWidth}
        />
      )}
      <Course course={data?.Get?.Record?.Preview?.View?.PreviewEntry?.data} />
    </>
  )
}

export default BrightspotPreview
