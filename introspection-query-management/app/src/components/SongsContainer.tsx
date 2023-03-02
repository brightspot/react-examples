import { useAllSongsQuery } from '../generated'
import Song from './Song'

const SongsContainer = () => {
  const { data, loading, error } = useAllSongsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (data?.AllSongs?.songs?.length === 0) {
    return (
      <div>
        <h1>Nothing Here 🧐</h1>
        <p>
          Publish a 'Song' in{' '}
          <a
            href={`${process.env.REACT_APP_BRIGHTSPOT_HOST}`}
            target="_blank"
            rel="noreferrer"
          >
            Brightspot
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="songs-container">
      {data?.AllSongs?.songs &&
        data.AllSongs.songs.map((song, index) => (
          <Song key={index} song={song} />
        ))}
    </div>
  )
}

export default SongsContainer
