import './App.css'
import { useMutation, gql, useQuery } from '@apollo/client'

const GET_FILE_ITEMS = gql`
  query GetItems {
    brightspot_example_file_uploads_FileUploadContentQuery {
      items {
        _type
        name
        file {
          contentType
          path
          inStorage
          publicUrl
          securePublicUrl
          storage
        }
      }
    }
  }
`

const UPLOAD_FILE = gql`
  mutation MyMutation($file: Upload, $name: String) {
    brightspot_example_file_uploads_FileUploadContentSave(
      diffs: {
        brightspot_example_file_uploads_FileUploadContentDiff: {
          file: { file: $file }
          name: $name
        }
      }
    ) {
      _id
      name
      file {
        publicUrl
        path
      }
    }
  }
`

function App() {
  // with Apollo
  const [UploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (uploadedFiledata) => console.log(uploadedFiledata),
  })

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    UploadFile({ variables: { file: file, name: 'mandi' } })
  }

  const { data, loading, error } = useQuery(GET_FILE_ITEMS)

  if (error) console.log(error.message)
  if (loading) return <div>Loading...</div>

  // Without Apollo
  // const handleFileUpload = (e:any) => {
  //   const file =e.target.files[0]
  //   const query = `mutation MyMutation($file: Upload, $name: String) {
  //     brightspot_example_file_uploads_FileUploadContentSave(
  //       diffs: {brightspot_example_file_uploads_FileUploadContentDiff: {file: {file: $file}, name: $name}}
  //     ) {
  //       _id
  //       name
  //       file {
  //         publicUrl
  //         path
  //       }
  //     }
  //   }`
  //          const variables = { file: null }
  //          const operations = { query, variables }
  //          const map = { 0: ['variables.file'] }

  //          const formData = new FormData();
  //          formData.append('operations', JSON.stringify(operations))
  //          formData.append('map', JSON.stringify(map))
  //          formData.append('0', file, file.name)

  //          fetch(process.env.REACT_APP_GRAPHQL_URL!, {
  //              method: 'POST',
  //              headers: {
  //               'X-Client-ID': process.env.REACT_APP_CLIENT_ID!,
  //               'X-Client-Secret': process.env.REACT_APP_CLIENT_SECRET!
  //              },
  //              body: formData,
  //          })
  //          .then(response => response.json())
  //          .then(responseData => {
  //              console.log('Success:', responseData);
  //              document.body.innerHTML = '<div>Upload Successful!</div>'
  //          })
  //          .catch((error) => {
  //              console.error('Error:', error);
  //   })
  // }

  let items = []
  if (data?.brightspot_example_file_uploads_FileUploadContentQuery?.items) {
    console.log(data)
    items =
      data?.brightspot_example_file_uploads_FileUploadContentQuery?.items.filter(
        (item: any) => item?.file?.contentType === 'image/jpeg'
      )
  }
  console.log(items)
  return (
    <div className="App">
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileUpload} />
      {items.length > 0 && (
        <img src={items[0].file.publicUrl} alt={items[0].name} />
      )}
    </div>
  )
}

export default App
