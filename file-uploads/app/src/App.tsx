import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { useState, useEffect, useRef } from 'react'
import { ChangeEvent } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { HiInformationCircle } from 'react-icons/hi'
import UPLOAD_IMAGE from './queries/UploadImage'
import GET_IMAGES from './queries/GetImages'
import DELETE_IMAGE from './queries/DeleteImage'

type ImageItem = {
  file: {
    contentType: string
    securePublicUrl: string
    metadata: {
      json: string
    }
  }
  name: string
  _id: string
}

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [showImageMetadata, setShowImageMetadata] = useState('')
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setShowImageMetadata('')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const [UploadImage] = useMutation(UPLOAD_IMAGE, {
    onError: (err) => {
      setErrorMessage(err.message)
    },
    onCompleted: () => {
      refetch()
    },
  })

  const [DeleteImage] = useMutation(DELETE_IMAGE, {
    onError: (err) => {
      setErrorMessage(err.message)
    },
    onCompleted: () => {
      refetch()
    },
  })

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    const file = e?.target?.files && e?.target?.files[0]
    UploadImage({ variables: { file } }).then(() => {
      e.target.value = '' // reset file upload input after completed
    })
  }

  const handleDelete = (id: string) => {
    setErrorMessage('')
    DeleteImage({ variables: { id: id } })
  }

  const { data, loading, refetch } = useQuery(GET_IMAGES, {
    onError: (err) => {
      setErrorMessage(err.message)
    },
  })

  const handleShowImageMetadata = (id: string) => {
    if (showImageMetadata === id) {
      setShowImageMetadata('')
    } else {
      setShowImageMetadata(id)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="App">
      <h1>File Uploads</h1>
      <label className="file-upload">
        Upload Image
        <input type="file" name="file" onChange={(e) => handleFileUpload(e)} />
      </label>
      <div className="container">
        {errorMessage && (
          <p className="error">
            <AiOutlineCloseCircle
              className="error-close"
              onClick={() => setErrorMessage('')}
            />
            {errorMessage}
          </p>
        )}
        <ul className="image-gallery">
          {data?.brightspot_example_file_uploads_ImageQuery?.items.map(
            (item: ImageItem) => (
              <li key={item?._id}>
                <div className="delete" onClick={() => handleDelete(item?._id)}>
                  <RiDeleteBinLine />
                </div>
                <div
                  className="info"
                  ref={infoRef}
                  onClick={() => {
                    handleShowImageMetadata(item?._id)
                  }}
                >
                  <HiInformationCircle />
                </div>
                <div
                  className="popup"
                  data-show={showImageMetadata === item?._id ? true : null}
                >
                  <p>Metadata:</p>
                  <pre>{item.file.metadata.json}</pre>
                </div>
                <img src={item?.file?.securePublicUrl} alt={item.name} />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
