import { useRef } from 'react'
import { useLikeSongsFunctions } from './useLikeSongsFunctions'
import { useSelectArtistState, useSelectState } from './useSelectState'

export function useButtonLike(song, table) {
  const { addLikeSong, userLibrary } = useSelectArtistState()
  const { setViewModals, viewModals } = useSelectState()

  const likeList = [...userLibrary.likeSongsList.items]

  userLibrary.userPlaylistCreated.map((pl) => [likeList.push(...pl.songs)])

  const { existSong } = useLikeSongsFunctions(likeList, song)
  const buttonElement = useRef(null)

  const handleClick = () => {
    addLikeSong(song)
  }

  const clickViewModal = () => {
    return setViewModals({
      addSongToList: !viewModals.addSongToList,
      table,
      song
    })
  }
  return { existSong, handleClick, clickViewModal, buttonElement }
}
