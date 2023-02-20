import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import GET_COURSES_DETAILED from '../queries/GetAllCoursesDetailed'

type Course = {
  ageRange?: string
  slug?: string
  subject?: string
  subtitle?: string
  title?: string
}

const Courses = () => {
  const { data, error, loading } = useQuery(GET_COURSES_DETAILED)
  if (loading) return <div className="loading">Loading...</div>
  if (error)
    return (
      <p className="error">{`There was an error fetching courses: ${error.message} `}</p>
    )

  return (
    <div className="course-container">
      <h1>All Courses</h1>
      <div className="cards-container">
        {data?.AllCourses?.courses?.map((course: Course, i: number) => (
          <Link className="card-link" to={`/courses/${course.slug}`} key={i}>
            <div className="course-card">
              <h3 className="course-cardTitle">{course.title}</h3>
              <div className="subject-age-container">
                <span className="course-subject-age">{course.subject}</span>
                <span className="course-subject-age">{course.ageRange}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Courses
