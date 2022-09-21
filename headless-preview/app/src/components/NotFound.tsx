import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="course-container">
      <div className="question-container">
        <span className="question-left">?</span>
        <span className="question-middle">?</span>
        <span className="question-right">?</span>
      </div>
      <h1>Oops!</h1>
      <p>Sorry, the page you were trying to access doesn't exist.</p>

      <Link to="/">
        <button className="home-button"> Return to homepage</button>
      </Link>
    </div>
  )
}

export default NotFound
