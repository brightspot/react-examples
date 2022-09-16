import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="notFound-container">
      <div>
        <h1>Sorry...</h1>
        <h2>The page you are trying to access doesn't exist.</h2>
        <Link to="/">
          <button className="notFound-goHome"> Return to homepage</button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
