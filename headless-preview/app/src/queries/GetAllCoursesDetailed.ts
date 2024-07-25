import { gql } from '@apollo/client'

const GET_COURSES_DETAILED = gql`
  query getAllCoursesDetailed {
    AllCourses {
      data {
        courses {
          _model {
            ageRange
            slug
            subject
            title
          }
        }
      }
    }
  }
`

export default GET_COURSES_DETAILED
