import { gql } from '@apollo/client'

const GET_COURSES_INSTRUCTORS = gql`
  query getInstructorsCourses {
    AllCourses {
      courses {
        slug
        title
      }
    }
    AllInstructors {
      instructors {
        name
        slug
      }
    }
  }
`

export default GET_COURSES_INSTRUCTORS
