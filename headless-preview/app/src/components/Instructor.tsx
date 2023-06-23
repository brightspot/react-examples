type Props = {
  instructor: {
    name: string
    slug: string
  }
}

const Instructor = ({ instructor }: Props) => {
  return (
    <>
      <div className="course-container">
        <h1 className="course-title">{instructor.name}</h1>
      </div>
    </>
  )
}

export default Instructor
