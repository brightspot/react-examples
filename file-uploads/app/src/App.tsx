import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import UPLOAD_IMAGE from './queries/UploadImage'
import GET_IMAGES from './queries/GetImages'
import DELETE_IMAGE from './queries/DeleteImage'

function App() {
  const [UploadImage, { error: imageError }] = useMutation(UPLOAD_IMAGE, {
    onCompleted: (uploadedFiledata) => {
      refetch()
      console.log(uploadedFiledata)
    },
  })

  const [DeleteImage, { error: deleteImageError }] = useMutation(DELETE_IMAGE, {
    onCompleted: (deletedFiledata) => {
      refetch()
      console.log(deletedFiledata)
    },
  })

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    UploadImage({ variables: { file } })
  }

  const handleDelete = (id: string) => {
    DeleteImage({ variables: { id: id } })
  }

  const { data, loading, error, refetch } = useQuery(GET_IMAGES)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>
  if (deleteImageError) return <div>{deleteImageError.message}</div>

  return (
    <div className="App">
      <h1>File Uploads</h1>
      {imageError && <div>{imageError.message}</div>}
      <label className="file-upload">
        Upload Image
        <input type="file" name="file" onChange={handleFileUpload} />
      </label>
      <div className="container">
        <ul className="image-gallery">
          {data?.brightspot_example_file_uploads_ImageQuery?.items.map(
            (item: any) => (
              <li key={item?._id}>
                <span
                  className="delete"
                  onClick={() => handleDelete(item?._id)}
                >
                  &times;
                </span>
                <img src={item?.file?.securePublicUrl} alt={item.name} />
                <div className="overlay">
                  {item?.file?.metadata?.entries[0].value}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
