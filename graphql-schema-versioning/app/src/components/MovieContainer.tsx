import { useMoviesQuery } from '../generated'
import MovieComponent from './Movie'

const MovieContainer = () => {
  const { loading, error, data } = useMoviesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="movies-container">
      {data?.Movies?.movies &&
        data.Movies.movies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
    </div>
  )
}

export default MovieContainer
