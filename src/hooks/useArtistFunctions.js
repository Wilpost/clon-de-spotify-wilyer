import { useSelectArtistState } from './useSelectState'

export const useArtistFunciton = (artistId) => {
  const { artists, userLibrary } = useSelectArtistState()
  const artist = artists.find((art) => {
    return art.id === artistId
  })

  function existSongInPlaylist(id) {
    return userLibrary.likeSongsList.items?.some((item) => item.id === id)
  }

  return { artist, existSongInPlaylist }
}
