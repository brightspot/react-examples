import './App.css'
// import { useMutation, gql } from '@apollo/client'

// const GET_FILE_ITEMS = gql`
// query GetItems {
//   brightspot_example_file_uploads_FileUploadContentQuery {
//     items {
//       _type
//       name
//       file {
//         contentType
//         path
//         inStorage
//         publicUrl
//         securePublicUrl
//         storage
//       }
//     }
//   }
// }
// // `

// const UPLOAD_FILE = gql`
// mutation UploadFile($file: StorageItemInput, $name: String) {
//   brightspot_example_file_uploads_FileUploadContentSave(
//     diffs: {brightspot_example_file_uploads_FileUploadContentDiff: {file: $file, name: $name}}
//   ) {
//     _id
//     name
//     file {
//       securePublicUrl
//       contentType
//       path
//       publicUrl
//     }
//   }
// }
// `


function App() {
// const [UploadFile] = useMutation(UPLOAD_FILE, {
//   onCompleted: uploadedFiledata => console.log(uploadedFiledata)
// })

// const handleFileUpload = (e: any) => {
//   const file = e.target.files[0]
//   UploadFile({ variables: { file: file, name: 'mandi'}})
// }

// const { data, loading, error } = useQuery(GET_FILE_ITEMS)

// if (error) console.log(error.message)
// if (loading) return <div>Loading...</div>

// const handleFileUpload = (e: any) => {
//   const file =e.target.files[0]
//   console.log(file)
//   const query = JSON.stringify({
//     query: 
//     `mutation UploadFile($file: StorageItemInput, $name: String) {
//       brightspot_example_file_uploads_FileUploadContentSave(
//         diffs: {brightspot_example_file_uploads_FileUploadContentDiff: {file: $file, name: $name}}
//       ) {
//         _id
//         name
//         file {
//           securePublicUrl
//           contentType
//           path
//           publicUrl
//         }
//       }
//     }`,
//     variables: {file: file, name: 'howdy'}
//   })
  
//   console.log({ query })
//   fetch(process.env.REACT_APP_GRAPHQL_URL!, {
//   method: 'POST',
//   headers: {
//     'X-Client-ID': '00000183d3c1d2e9a1afdbf752850000',
//     'X-Client-Secret': 'FVeSGlSJAFwqixC4h3qHoqICNlBgecjAI2djAhd'
//   },
//   body: query,
// })
// .then(response => response.json())
// .then(responseData => {
//   console.log('Success:', responseData);
// })
// .catch((error) => {
//   console.error('Error:', error);
// }); 
// }


const handleFileUpload = (e:any) => {
  const file =e.target.files[0]
  const query = `mutation UploadFile($file: StorageItemInput, $name: String) {
          brightspot_example_file_uploads_FileUploadContentSave(
             diffs: {brightspot_example_file_uploads_FileUploadContentDiff: {file: $file, name: $name}}
           ) {
             _id
             name
             file {
               securePublicUrl
               contentType
               path
               publicUrl
             }
           }
         }`
         const variables = { file: null }
         const operations = { query, variables }
         const map = { 0: ['variables.file'] }

         const formData = new FormData();
         formData.append('operations', JSON.stringify(operations))
         formData.append('map', JSON.stringify(map))
         formData.append('0', file, file.name)

         fetch(process.env.REACT_APP_GRAPHQL_URL!, {
             method: 'POST',
             headers: {
              'X-Client-ID': '00000183d750dd5badf3ffde0ebf0000',
              'X-Client-Secret': 'bDTXVOo5wXbiUv3abbO8MxQsNyzlANsNIMNfoFt'
             },
             body: formData,
         })
         .then(response => response.json())
         .then(responseData => {
             console.log('Success:', responseData);
             document.body.innerHTML = '<div>Upload Successful!</div>'
         })
         .catch((error) => {
             console.error('Error:', error);
  })
}

// let items = []
// if (data?.brightspot_example_file_uploads_FileUploadContentQuery?.items) {
//   console.log(data)
//   items = data?.brightspot_example_file_uploads_FileUploadContentQuery?.items.filter((item: any) => item?.file?.contentType === "image/jpeg")
// }

  return (
  <div className="App">
    <h1>Upload File</h1>
    <input type="file" onChange={handleFileUpload} />
  </div>
  )
}

export default App
