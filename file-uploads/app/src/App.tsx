import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import UPLOAD_IMAGE from './queries/UploadImage'
import GET_IMAGES from './queries/GetImages'
import DELETE_IMAGE from './queries/DeleteImage'
import FileUploadCard from './FileUploadCard'

type ImageItem = {
  file: {
    contentType: string
    publicUrl: string
    metadata: {
      json: string
    }
  }
  name: string
  _id: string
}

function App() {
  const [errorMessage, setErrorMessage] = useState('')

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

  const { data, loading, refetch } = useQuery(GET_IMAGES, {
    onError: (err) => {
      setErrorMessage(err.message)
    },
  })

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
              <FileUploadCard
                key={item._id}
                DeleteImage={DeleteImage}
                json={item.file.metadata.json}
                name={item.name}
                id={item._id}
                url={item.file.publicUrl}
                setErrorMessage={setErrorMessage}
              />
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
