import { useSelectArtistState, useSelectState } from './useSelectState'

export const usePlaySong = () => {
  const {
    setSongState,
    songState,
    duration,
    setDuration,
    newSongHearRecent,
    hearSongRecent
  } = useSelectState()

  const { songSelect, playPauseBar } = useSelectArtistState()

  // Cada elemento que tenga la posibilidad de reproducir musica debe enviar el typo de playlist/album/artist-playlist
  const audioControl = ({ albumId, song = null, list = [], type, albums }) => {
    // Si es la primera vez que se reproduce un album/playlist/artist-playlist...
    if (
      songSelect.albumId !== albumId ||
      (songSelect.albumId !== albumId && songSelect.song?.id !== song?.id)
    ) {
      newSongHearRecent(albumId, albums)
      if (!list[0]?.hear) {
        setSongState(true)
        playPauseBar(albumId, list[0]?.id, type, true)
        hearSongRecent(albumId, true)
      } else {
        setSongState(false)
        playPauseBar(albumId, list[0]?.id, type, true)
        hearSongRecent(albumId, false)
      }

      return
    } else if (
      (songSelect.song?.id !== song?.id && songSelect.albumId === albumId) ||
      (songSelect.albumId === albumId && song === null)
    ) {
      setDuration(song?.duration_ms ?? songSelect.song?.duration_ms)
      newSongHearRecent(albumId, albums)

      if (song === null) {
        if (songSelect.song?.hear === false) {
          setSongState(true)
          hearSongRecent(songSelect.albumId, true)
          playPauseBar(songSelect.albumId, songSelect.song?.id, type, true)
        } else {
          setSongState(false)
          hearSongRecent(songSelect.albumId, false)
          playPauseBar(songSelect.albumId, songSelect.song?.id, type, false)
        }
      } else if (!song?.hear) {
        setSongState(true)
        hearSongRecent(albumId, true)
        playPauseBar(albumId, song?.id, type, true)
      } else {
        setSongState(false)
        hearSongRecent(albumId, false)
        playPauseBar(albumId, song?.id, type, false)
      }

      return
    }

    if (!songState) {
      setSongState(true)
      hearSongRecent(albumId, true)
      playPauseBar(albumId, songSelect.song?.id, songSelect.type_album, true)
    } else {
      setSongState(false)
      hearSongRecent(albumId, false)
      playPauseBar(albumId, songSelect.song?.id, songSelect.type_album, false)
    }
  }

  return {
    setSongState,
    audioControl,
    duration,
    setDuration
  }
}
