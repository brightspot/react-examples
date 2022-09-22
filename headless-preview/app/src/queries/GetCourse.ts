import { gql } from '@apollo/client'

const GET_COURSE = gql`
  query GetCourse($id: ID, $slug: String) {
    Course(model: { slug: $slug, id: $id }) {
      title
      description
      ageRange
      subject
    }
  }
`

export default GET_COURSE
