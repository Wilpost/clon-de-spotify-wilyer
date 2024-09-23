import { useCallback } from 'react'
import { useFooterShanges } from './useFooterShanges'
import { usePlaySong } from './usePlaySong'
import { useSelectArtistState, useSelectState } from './useSelectState'
import { useMemo } from 'react'

export function usePlayerActions({ audioRef = null, song = {} }) {
  const { songState, setCurrentTime, setSongState } = useSelectState()
  const { shangeSongHear } = useFooterShanges(audioRef)

  const { artists } = useSelectArtistState()
  const { audioControl } = usePlaySong()

  const handleClick = useCallback(() => {
    audioControl({
      type: 'artist',
      albumId: song?.data?.id ?? song?.id,
      list: song?.data?.trackList ?? song?.trackList,
      albums: artists
    })
  }, [song, artists])

  const handleTime = useMemo(() => {
    return (e) => {
      const currentTimeParser = Math.floor(parseInt(e.target.currentTime) % 60)

      setCurrentTime(parseInt(e.target.currentTime))

      if (currentTimeParser === 29) {
        setSongState(true)
        shangeSongHear('NEXT')
      }
    }
  }, [])

  const playSongMemo = async () => {
    if (songState) {
      await audioRef.current.play()
    } else {
      await audioRef.current.pause()
    }
  }

  const playSong = useCallback(() => {
    playSongMemo()
  }, [songState])

  return { playSong, handleTime, handleClick }
}
