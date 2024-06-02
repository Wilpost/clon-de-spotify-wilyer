import { useFooterShanges } from './useFooterShanges'
import { useSelectState } from './useSelectState'

export function usePlayerActions(audioRef) {
  const { songState, setCurrentTime, setSongState } = useSelectState()
  const { shangeSongHear } = useFooterShanges(audioRef)

  const handleTime = (e) => {
    const currentTimeParser = Math.floor(parseInt(e.target.currentTime) % 60)

    setCurrentTime(parseInt(e.target.currentTime))

    if (currentTimeParser === 29) {
      console.log('listo')
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
  return { playSong, handleTime }
}
