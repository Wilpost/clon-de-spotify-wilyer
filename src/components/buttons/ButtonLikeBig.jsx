import { useSelectArtistState } from '../../hooks/useSelectState'
import { IconAddMyPlaylist, IconAddedToMyPlaylist } from '../../icons/Icons'

export const ButtonLikeBig = ({ song }) => {
  const { likeSongsList, addLikeSong } = useSelectArtistState()

  const existSong = likeSongsList?.items?.some((item) => item.id === song.id)

  const handleClick = () => {
    addLikeSong(song)
  }

  return (
    <button
      onClick={handleClick}
      className='opacity-60 hover:opacity-100 transition'
    >
      {existSong && <IconAddedToMyPlaylist h={26} w={26} />}
      {!existSong && <IconAddMyPlaylist h={26} w={26} />}
    </button>
  )
}
