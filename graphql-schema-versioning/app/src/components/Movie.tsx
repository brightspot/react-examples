import { Movie } from '../generated'

const MovieComponent = (movie: Movie) => (
  <div className="movie-card">
    <h1>{movie.title}</h1>
    <h2>{movie.description}</h2>
    <img
      className="movie-image"
      src="https://img.freepik.com/premium-vector/movie-camera-vector-icon-isolated-object-white-background_661273-89.jpg"
      alt="movie"
    />
  </div>
)

export default MovieComponent
