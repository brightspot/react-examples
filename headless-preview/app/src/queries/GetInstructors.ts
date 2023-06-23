import { gql } from '@apollo/client'

const GET_INSTRUCTORS = gql`
  query getAllCoursesDetailed {
    AllInstructors {
      instructors {
        name
        slug
      }
    }
  }
`

export default GET_INSTRUCTORS
