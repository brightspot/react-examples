import { gql } from '@apollo/client'

const GET_COURSES_BASIC = gql`
  query getAllCourses {
    AllCourses {
      courses {
        slug
        title
      }
    }
  }
`

export default GET_COURSES_BASIC
