type Props = {
  course: {
    title: string
    slug: string
    description: string
    ageRange: string
    subject: string
  }
}

const Course = ({ course }: Props) => {
  return (
    <>
      <div className="course-container">
        <h1 className="course-title">{course.title}</h1>
        <div className="course-subject-age-container">
          <span className="course-subject-age with-margin">
            {course.ageRange}
          </span>
          <span className="course-subject-age">{course.subject}</span>
        </div>
        <p className="course-description">{course.description}</p>
      </div>
    </>
  )
}

export default Course
