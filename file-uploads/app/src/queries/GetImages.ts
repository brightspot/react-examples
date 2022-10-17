import { gql } from '@apollo/client'

const GET_IMAGES = gql`
  query GetImages($keys: [String!] = ["originalFilename"]) {
    brightspot_example_file_uploads_ImageQuery {
      items {
        file {
          securePublicUrl
          contentType
          metadata {
            entries(keys: $keys) {
              value
            }
          }
        }
        _id
        name
      }
    }
  }
`

export default GET_IMAGES
