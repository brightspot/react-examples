import useSessionStorage from '../utils/useSessionStorage'

type Props = {
  previewId: string
  previewType: string
}

const PreviewBanner = ({ previewId, previewType }: Props) => {
  const deviceWidth = new URLSearchParams(window.location.search)
    .get('deviceWidth')
    ?.valueOf()
  const [showPreview, setShowPreview] = useSessionStorage(
    'show-preview',
    'true'
  )

  const handlePreview = () => {
    if (showPreview === 'true') {
      setShowPreview('false')
    } else {
      setShowPreview('true')
    }
  }

  return (
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
        <span className="preview-width">{`${deviceWidth}`}</span>
        <br />
        <a
          href={`${process.env.REACT_APP_CMS_HOST_URL}/_debug/query?where=${previewId}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="preview-link">Debug Tool</span>
        </a>
      </div>
    </>
  )
}

export default PreviewBanner
