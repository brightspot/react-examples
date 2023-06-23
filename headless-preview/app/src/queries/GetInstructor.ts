import { gql } from '@apollo/client'

const GET_INSTRUCTOR = gql`
  query GetInstructor($preview: PreviewInput, $slug: String) {
    Instructor(preview: $preview, model: { slug: $slug }) {
      name
    }
    HeadlessPreviewEndpoint {
      id
    }
  }
`

export default GET_INSTRUCTOR
