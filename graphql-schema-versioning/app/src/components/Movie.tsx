import { useMovieQuery } from '../generated'

const Movie = () => {
  const { loading, error, data } = useMovieQuery({
    variables: {
      path: '/spiderman-no-way-home',
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error?.message}</div>

  return (
    <>
      {data?.Movie && (
        <div>
          <h1>{data.Movie?.title}</h1>
          <h2>{data?.Movie.description}</h2>
        </div>
      )}
    </>
  )
}

export default Movie
