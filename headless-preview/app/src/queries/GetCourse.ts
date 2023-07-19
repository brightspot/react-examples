import { gql } from '@apollo/client'

const GET_COURSE = gql`
  query GetCourse($preview: PreviewInput, $slug: String) {
    Course(preview: $preview, model: { slug: $slug }) {
      title
      description
      ageRange
      subject
    }
    HeadlessPreviewEndpoint {
      id
    }
  }
`

export default GET_COURSE
