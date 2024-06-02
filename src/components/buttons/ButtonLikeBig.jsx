import { useSelectState } from '../../hooks/useSelectState'
import { IconAddMyPlaylist, IconAddedToMyPlaylist } from '../../icons/Icons'

export const ButtonLikeBig = ({ song }) => {
  const { userLibrary, addToLibrary, setScroll, scroll } = useSelectState()

  const existSong = userLibrary.some((item) => item.id === song.id)

  const handleClick = () => {
    setScroll(scroll - 1)
    addToLibrary(song)
  }

  return (
    <>
      {existSong && (
        <button
          onClick={() => handleClick()}
          className='opacity-60 hover:opacity-100 transition'
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
