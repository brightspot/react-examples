import { useQuery } from '@apollo/client'
import useSessionStorage from '../utils/useSessionStorage'
import Course from './Course'
import NotFound from './NotFound'
import GET_COURSE from '../queries/GetCourse'

type Props = {
  previewId: string
  previewType: string
}

const BrightspotPreview = ({ previewId, previewType }: Props) => {
  const deviceWidth = new URLSearchParams(window.location.search)
    .get('deviceWidth')
    ?.valueOf()

  const [showPreview, setShowPreview] = useSessionStorage(
    'show-preview',
    'true'
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

  const handlePreview = () => {
    if (showPreview === 'true') {
      setShowPreview('false')
    } else {
      setShowPreview('true')
    }
  }

  const widthColor = () => {
    if (deviceWidth === '1920') {
      return 'lightsalmon'
    } else if (deviceWidth === '1440') {
      return 'lightyellow'
    } else if (deviceWidth === '1280') {
      return 'lightgreen'
    } else if (deviceWidth === '1024') {
      return 'lightblue'
    } else if (deviceWidth === '768') {
      return 'lightseagreen'
    } else if (deviceWidth === '640') {
      return 'lightorange'
    } else if (deviceWidth === '360') {
      return 'lightpink'
    } else return ''
  }

  return (
    <>
      {previewId && previewType && (
        <>
          <button className="preview-button" onClick={handlePreview}>
            Preview information
          </button>
          <div
            className="preview-information"
            data-preview={showPreview === 'true' ? true : null}
          >
            <span className="preview-text">previewId: </span>
            <span>{`${previewId}`}</span>
            <br />
            <span className="preview-text">previewType: </span>
            <span>{`${previewType}`}</span>
            <br />
            <span className="preview-text">deviceWidth: </span>
            <span
              className="preview-width"
              style={{ background: widthColor() }}
            >{`${deviceWidth}`}</span>
            <br />
            <a
              href={`http://localhost/_debug/query?where=${previewId}`}
              rel="noreferrer"
              target="_blank"
            >
              <span className="preview-link">Debug Tool</span>
            </a>
          </div>
        </>
      )}
      <Course course={data.Course} />
    </>
  )
}

export default BrightspotPreview
