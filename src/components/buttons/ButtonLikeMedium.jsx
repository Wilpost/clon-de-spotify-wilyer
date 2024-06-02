import { useEffect, useRef } from 'react'
import { useLikeSongsFunctions } from '../../hooks/useLikeSongsFunctions'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { IconAddMyPlaylist, IconAddedToMyPlaylist } from '../../icons/Icons'

export const ButtonLikeMedium = ({ song }) => {
  const { addLikeSong, likeSongsList } = useSelectArtistState()
  const { setViewModals, viewModals } = useSelectState()
  const { existSong } = useLikeSongsFunctions(likeSongsList, song)
  const buttonElement = useRef(null)

  const handleClick = () => {
    addLikeSong(song)
  }

  const clickViewModal = () => {
    setViewModals({ addSongToList: !viewModals.addSongToList })
  }

  // useEffect(() => {
  //   document.addEventListener('click', (e) => {
  //     console.log(
  //       e.target.parentElement.parentElement.parentElement,
  //       buttonElement.current
  //     )

  //     if (
  //       e.target.parentElement.parentElement.parentElement !==
  //         buttonElement.current &&
  //       viewModals.addSongToList
  //     ) {
  //       return setViewModals({ addSongToList: false })
  //     } else {
  //       setViewModals({ addSongToList: !viewModals.addSongToList })
  //     }
  //   })

  //   return () => document.removeEventListener('click', () => {})
  // }, [])

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
          onClick={() => clickViewModal()}
        >
          <IconAddedToMyPlaylist />
        </button>
      )}
    </>
  )
}
