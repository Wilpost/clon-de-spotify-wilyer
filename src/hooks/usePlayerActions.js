import { useFooterShanges } from './useFooterShanges'
import { usePlaySong } from './usePlaySong'
import { useSelectArtistState, useSelectState } from './useSelectState'

export function usePlayerActions({ audioRef = null, song = {} }) {
  const { songState, setCurrentTime, setSongState } = useSelectState()
  const { shangeSongHear } = useFooterShanges(audioRef)

  const { artists } = useSelectArtistState()
  const { audioControl } = usePlaySong()

  const handleClick = async () => {
    audioControl({
      type: 'artist',
      albumId: song?.data?.id ?? song?.id,
      list: song?.data?.trackList ?? song?.trackList,
      albums: artists
    })
  }

  const handleTime = (e) => {
    const currentTimeParser = Math.floor(parseInt(e.target.currentTime) % 60)

    setCurrentTime(parseInt(e.target.currentTime))

    if (currentTimeParser === 29) {
      setSongState(true)
      shangeSongHear('NEXT')
    }
  }

  const playSong = async () => {
    if (songState) {
      await audioRef.current.play()
    } else {
      await audioRef.current.pause()
    }
  }
  return { playSong, handleTime, handleClick }
}
