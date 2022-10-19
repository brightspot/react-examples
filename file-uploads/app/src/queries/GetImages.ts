import { gql } from '@apollo/client'

const GET_IMAGES = gql`
  query GetImages {
    brightspot_example_file_uploads_ImageQuery {
      items {
        file {
          securePublicUrl
          contentType
          metadata {
            json
          }
        }
        _id
        name
      }
    }
  }
`

export default GET_IMAGES
