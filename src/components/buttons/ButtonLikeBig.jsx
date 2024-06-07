import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { IconAddMyPlaylist, IconAddedToMyPlaylist } from '../../icons/Icons'

export const ButtonLikeBig = ({ song }) => {
  const { setScroll, scroll } = useSelectState()
  const { userLibrary, addToLibrary } = useSelectArtistState()

  const existSong = userLibrary.albumsLike.some((item) => item.id === song.id)

  const handleClick = () => {
    setScroll(scroll - 1)
    addToLibrary(song)
  }

  return (
    <>
      {existSong && (
        <button
          onClick={() => handleClick()}
          className='hover:opacity-100 transition'
        >
          <IconAddedToMyPlaylist h={26} w={26} />
        </button>
      )}

      {!existSong && (
        <button
          onClick={() => handleClick()}
          className='opacity-60 hover:opacity-100 transition'
        >
          <IconAddMyPlaylist h={26} w={26} />
        </button>
      )}
    </>
  )
}
