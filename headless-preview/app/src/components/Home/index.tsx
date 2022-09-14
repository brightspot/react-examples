import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section className="home-container">
        <h1 className="home-title">
          Learning is an incredible adventure. Ready, set,{' '}
          <span className="accent">go!</span>
        </h1>
        <h3>
          Let kids learn what they want to learn, at their pace, on their
          schedule
        </h3>
        <Link to="/courses" className="home-cta">
          Browse Courses
        </Link>
      </section>
    </>
  )
}

export default Home
