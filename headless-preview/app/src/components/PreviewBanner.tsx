import useSessionStorage from '../utils/useSessionStorage'

type Props = {
  id: string
  previewId: string
  view: string
  deviceWidth: string
}

const PreviewBanner = ({ id, previewId, view, deviceWidth }: Props) => {
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
        <span className="preview-text">objectId: </span>
        <span>{`${id}`}</span>
        <br />
        <span className="preview-text">previewId: </span>
        <span>{`${previewId}`}</span>
        <br />
        <span className="preview-text">view: </span>
        <span>{`${view}`}</span>
        <br />
        <span className="preview-text">deviceWidth: </span>
        <span className="preview-text">{`${deviceWidth}`}</span>
        <br />
      </div>
    </>
  )
}

export default PreviewBanner
