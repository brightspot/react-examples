import { useMoviesQuery } from '../generated'
import MovieComponent from './Movie'

const MovieContainer = () => {
  const { loading, error, data } = useMoviesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="movies-container">
      {data?.AllMovies?.movies &&
        data.AllMovies.movies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
    </div>
  )
}

export default MovieContainer
