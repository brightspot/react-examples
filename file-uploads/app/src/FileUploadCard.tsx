import { useState, useRef, Dispatch, SetStateAction, useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoInformationCircleSharp } from 'react-icons/io5'

type Props = {
  setErrorMessage: Dispatch<SetStateAction<string>>
  id: string
  json: string
  url: string
  name: string
  DeleteImage: Function
}

const FileUploadCard = ({
  setErrorMessage,
  id,
  json,
  url,
  name,
  DeleteImage,
}: Props) => {
  const [showImageMetadata, setShowImageMetadata] = useState(false)
  const infoRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        infoRef.current &&
        !infoRef.current.contains(e.target)
      ) {
        setShowImageMetadata(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const handleDelete = (id: string) => {
    setErrorMessage('')
    DeleteImage({ variables: { id: id } })
  }

  return (
    <li key={id}>
      <div className="delete" onClick={() => handleDelete(id)}>
        <RiDeleteBinLine />
      </div>
      <div
        className="info"
        ref={infoRef}
        onClick={() => setShowImageMetadata(!showImageMetadata)}
      >
        <IoInformationCircleSharp />
      </div>
      <div
        ref={popupRef}
        className="popup"
        data-show={showImageMetadata || null}
      >
        <p>Metadata:</p>
        <pre>{json}</pre>
      </div>
      <img src={url} alt={name} height="300" width="500" />
    </li>
  )
}

export default FileUploadCard
