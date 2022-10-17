import { gql } from '@apollo/client'

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload) {
    brightspot_example_file_uploads_ImageSave(
      diffs: {
        brightspot_example_file_uploads_ImageDiff: {
          file: { file: $file }
        }
      }
    ) {
      file {
        securePublicUrl
        contentType
      }
    }
  }
`

export default UPLOAD_IMAGE
