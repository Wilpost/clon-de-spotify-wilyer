import { usePlaySong } from '../hooks/usePlaySong'
import { useSelectArtistState } from './useSelectState'

export const useFooterShanges = () => {
  const { audioControl } = usePlaySong()
  const { songSelect, userLibrary, albums, artists } = useSelectArtistState()

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
          list: songSelect.list,
          type: songSelect?.type_album,
          albums:
            (songSelect?.type_album === 'myPlaylist' &&
              userLibrary.likeSongsList.items) ||
            (songSelect?.type_album === 'album' && albums) ||
            (songSelect?.type_album === 'artist' && artists) ||
            (songSelect?.type_album === 'myPlaylistCreated' &&
              userLibrary.userPlaylistCreated)
        })
      }
    }

    if (action === 'BACK') {
      const songFound = songSelect?.list[index - 1]

      if (songFound) {
        audioControl({
          albumId: songSelect?.albumId,
          song: songFound,
          list: songSelect.list,
          type: songSelect?.type_album,
          albums:
            (songSelect?.type_album === 'myPlaylist' &&
              userLibrary.likeSongsList.items) ||
            (songSelect?.type_album === 'album' && albums) ||
            (songSelect?.type_album === 'artist' && artists) ||
            (songSelect?.type_album === 'myPlaylistCreated' &&
              userLibrary.userPlaylistCreated)
        })
      }
    }
  }

  return { shangeSongHear }
}
