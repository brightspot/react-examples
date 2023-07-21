import { Song } from '../generated'
import {
  MdAlbum,
  MdCalendarToday,
  MdCategory,
  MdSubtitles,
} from 'react-icons/md'

interface SongProps {
  song: Song | null
}

const SongComponent = ({ song }: SongProps) => (
  <div className="song-card">
    <h2>{song?.name}</h2>
    <div>
      <MdSubtitles />
      <div>{song?.artist}</div>
    </div>
    <div>
      <MdAlbum />
      <div>{song?.album}</div>
    </div>
    <div>
      <MdCategory />
      <div>{song?.genre}</div>
    </div>
    <div>
      <MdCalendarToday />
      <div>{song?.year}</div>
    </div>
  </div>
)

export default SongComponent
