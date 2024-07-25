import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import GET_COURSES_DETAILED from '../queries/GetAllCoursesDetailed'

type Course = {
  _model?: {
    ageRange?: string
    slug?: string
    subject?: string
    title?: string
  }
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
        {data?.AllCourses?.data?.courses?.map((course: Course, i: number) => (
          <Link className="card-link" to={`/courses/${course?._model?.slug}`} key={i}>
            <div className="course-card">
              <h3 className="course-cardTitle">{course?._model?.title}</h3>
              <div className="subject-age-container">
                <span className="course-subject-age">{course?._model?.subject}</span>
                <span className="course-subject-age">{course?._model?.ageRange}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Courses
