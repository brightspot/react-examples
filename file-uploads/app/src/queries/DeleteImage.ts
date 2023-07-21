import { gql } from '@apollo/client'

const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    brightspot_example_file_uploads_ImageDelete(id: $id, permanently: true) {
      name
      _id
    }
  }
`

export default DELETE_IMAGE
