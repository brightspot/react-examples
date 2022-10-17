import { Movie } from '../generated'

const MovieComponent = ({ title, description }: Movie) => (
  <div className="movie-card">
    <h1>{title}</h1>
    <h2>{description}</h2>
    <img
      className="movie-image"
      src="https://img.freepik.com/premium-vector/movie-camera-vector-icon-isolated-object-white-background_661273-89.jpg"
      alt="movie"
    />
  </div>
)

export default MovieComponent
