import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_COURSES_DETAILED = gql`
  query getAllCoursesDetailed {
    Courses {
      courses {
        ageRange
        slug
        subject
        subtitle
        title
      }
    }
  }
`

type Course = {
  ageRange?: string
  slug?: string
  subject?: string
  subtitle?: string
  title?: string
}

const Courses = () => {
  const { data, error, loading } = useQuery(GET_COURSES_DETAILED)
  if (loading) return <h3 className="loading">Loading...</h3>
  if (error) console.log(error.message)

  return (
    <div className="course-container">
      <h1>All Courses</h1>
      <div className="cards-container">
        {data?.Courses?.courses?.map((course: Course, i: number) => {
          return (
            <Link className="card-link" to={`/courses/${course.slug}`}>
              <div className="course-card">
                <h3>{course.title}</h3>
                <h4 className="course-subtitle">{course.subtitle}</h4>
                <div className="subject-age-container">
                  <span className="course-subject-age">{course.subject}</span>
                  <span className="course-subject-age">{course.ageRange}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Courses
