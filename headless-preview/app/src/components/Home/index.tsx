import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <section className="home-container">

          <h1 className="home-title">
            Learning is an incredible adventure. Ready, set,{' '}
            <span className="accent">go!</span>
          </h1>
          <p>
            We are devoted to helping learners discover wonder and delight in
            education.
          </p>
          <Link to='/courses' className="home-cta">Browse Courses</Link>
      </section>
    </>
  )
}

export default Home
