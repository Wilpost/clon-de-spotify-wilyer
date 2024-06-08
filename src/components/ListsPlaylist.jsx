import { useSelectState } from '../hooks/useSelectState'
import { CardSongRecent } from './Cards/SongRecentCard'

const ListPlaylist = () => {
  const { recentHeardSongs } = useSelectState()

  return (
    <>
      {recentHeardSongs?.length > 0 &&
        recentHeardSongs?.slice(0, 8).map((song, index) => {
          return <CardSongRecent key={index} song={song} />
        })}
    </>
  )
}

export default ListPlaylist
