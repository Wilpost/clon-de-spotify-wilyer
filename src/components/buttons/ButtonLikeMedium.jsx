import { useButtonLike } from '../../hooks/useButtonLike'
import { IconAddMyPlaylist, IconAddedToMyPlaylist } from '../../icons/Icons'

export const ButtonLikeMedium = ({ song, table = false }) => {
  const { existSong, handleClick, buttonElement, clickViewModal } =
    useButtonLike(song, table)

  return (
    <>
      {!existSong && (
        <button
          onClick={handleClick}
          className='opacity-60 hover:opacity-100 transition'
        >
          <IconAddMyPlaylist />
        </button>
      )}

      {existSong && (
        <button
          className='w-9 h-9'
          ref={buttonElement}
          onClick={() => {
            clickViewModal()
          }}
        >
          <IconAddedToMyPlaylist />
        </button>
      )}
    </>
  )
}
