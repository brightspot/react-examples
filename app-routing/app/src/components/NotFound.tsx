import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="notFound-container">
      <div>
        <h1>Sorry...</h1>
        <p>The page you are trying to access doesn't exist.</p>
        <Link to="/">
          <button className="notFound-goHome"> Return to homepage</button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
