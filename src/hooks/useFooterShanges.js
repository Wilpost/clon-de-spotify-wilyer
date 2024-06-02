import { usePlaySong } from '../hooks/usePlaySong'
import { useSelectArtistState } from './useSelectState'

export const useFooterShanges = () => {
  const { audioControl } = usePlaySong()
  const { songSelect } = useSelectArtistState()

  const shangeSongHear = (action) => {
    const index = songSelect.list.findIndex(
      (track) => track?.id === songSelect.song?.id
    )

    if (action === 'NEXT') {
      const songFound = songSelect.list[index + 1]

      if (songFound) {
        audioControl({
          albumId: songSelect?.albumId,
          song: songFound,
          list: songFound.list,
          type: songSelect?.type_album
        })
      }
    }

    if (action === 'BACK') {
      const songFound = songSelect?.list[index - 1]

      if (songFound) {
        audioControl({
          albumId: songSelect?.albumId,
          song: songFound,
          list: songFound.list,
          type: songSelect?.type_album
        })
      }
    }
  }

  return { shangeSongHear }
}
