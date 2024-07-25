type Props = {
  course: {
    _model: {
      title: string
      slug: string
      description: string
      ageRange: string
      subject: string
    }
  }
}

const Course = ({ course }: Props) => {
  return (
    <>
      <div className="course-container">
        <h1 className="course-title">{course?._model?.title}</h1>
        <div className="course-subject-age-container">
          <span className="course-subject-age with-margin">
            {course?._model?.ageRange}
          </span>
          <span className="course-subject-age">{course?._model?.subject}</span>
        </div>
        <p className="course-description">{course?._model?.description}</p>
      </div>
    </>
  )
}

export default Course
