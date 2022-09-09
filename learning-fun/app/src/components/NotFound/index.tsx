import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="question-container">
        <span className="question-left">?</span>
        <span className="question-middle">?</span>
        <span className="question-right">?</span>
      </div>
      <h1>Oops!</h1>
      <h2>Sorry, </h2>
      <p>the page you were trying to access doesn't exist.</p>

      <Link to="/">
        <button className="home-cta"> Return to homepage</button>
      </Link>
    </div>
  )
}

export default NotFound
