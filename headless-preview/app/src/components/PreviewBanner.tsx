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

  const widthColor = () => {
    let deviceWidthColor = ''
    switch (deviceWidth) {
      case '1920':
        deviceWidthColor = '#DBFFFF'
        break
      case '1440':
        deviceWidthColor = '#E1EBFF'
        break
      case '1280':
        deviceWidthColor = '#FFD2fB'
        break
      case '1024':
        deviceWidthColor = '#F8F7FF'
        break
      case '768':
        deviceWidthColor = '#BEFFDA'
        break
      case '640':
        deviceWidthColor = '#D7FFCE'
        break
      case '360':
        deviceWidthColor = '#FAFFD4'
        break
      default:
        console.log('no width provided')
    }
    return deviceWidthColor
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
  )
}

export default PreviewBanner
