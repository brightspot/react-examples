import { gql } from '@apollo/client'

const GET_ALL_COURSES = gql`
  query getAllCoursesDetailed {
    Courses {
      courses {
        ageRange
        slug
        subject
        title
      }
    }
  }
`

export default GET_ALL_COURSES
