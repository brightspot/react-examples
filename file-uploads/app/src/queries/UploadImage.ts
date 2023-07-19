import { gql } from '@apollo/client'

const UPLOAD_IMAGE = gql`
  mutation UploadImage($name: String, $file: Upload, $url: URL) {
    brightspot_example_file_uploads_ImageSave(
      diffs: {
        brightspot_example_file_uploads_ImageDiff: {
          name: $name
          file: { file: $file, url: $url }
        }
      }
    ) {
      file {
        securePublicUrl
        contentType
      }
      name
    }
  }
`

export default UPLOAD_IMAGE
