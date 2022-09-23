import { Movie } from '../generated'
interface Props {
  movie: Movie | undefined
}

const MovieComponent = ({ movie }: Props) => {
  if (movie === undefined) return <></>
  if (!movie) return <div>The movie does not exist (404)</div>
  const { title, description } = movie

  return (
    <div className="movie">
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  )
}

export default MovieComponent
