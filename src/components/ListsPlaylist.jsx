import { useSelectState } from '../hooks/useSelectState'
import { CardSongRecent } from './Cards/SongRecentCard'

const ListPlaylist = () => {
  const { recentHeardSongs } = useSelectState()

  return (
    <>
      {recentHeardSongs?.length > 0 &&
        recentHeardSongs?.slice(0, 8).map((song) => {
          return <CardSongRecent key={song.id} song={song} />
        })}
    </>
  )
}

export default ListPlaylist
