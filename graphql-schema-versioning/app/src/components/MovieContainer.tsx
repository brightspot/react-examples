import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { MovieDocument } from '../generated'
import MovieComponent from './MovieComponent'

interface ContainerData {
  path?: string | undefined
}

const MovieContainer = () => {
  const [movieData, setMovieData] = useState<ContainerData>()

  const { loading, error, data } = useQuery(MovieDocument, {
    variables: {
      path: movieData?.path || '',
    },
  })

  const getMovie = async (input: string | null) => {
    if (input) setMovieData({ path: input })
  }

  let timeoutId: ReturnType<typeof setTimeout>
  const debounce = (fn: Function, ms = 300) => {
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(() => getMovie(e?.target?.value), 1000)()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error?.message}</div>
  return (
    <>
      <div className="Movie-container">
        <MovieComponent
          movie={movieData === undefined ? undefined : data?.Movie}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="path">Enter Movie Path:</label>
        <input required name="path" onChange={handleOnChange} />
      </div>
    </>
  )
}

export default MovieContainer
