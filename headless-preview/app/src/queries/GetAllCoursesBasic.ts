import { gql } from '@apollo/client'

const GET_COURSES_BASIC = gql`
  query getAllCourses {
    AllCourses {
      data {
        courses {
          _model {
            slug
            title
          }
        }
      }
    }
  }
`

export default GET_COURSES_BASIC
