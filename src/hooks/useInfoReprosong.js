import { useState } from 'react'
import { useSelectArtistState } from './useSelectState'

export function useInfoReproSong() {
  const { songSelect } = useSelectArtistState()
  const [animate, setAnimate] = useState(false)

  function timeAnimate() {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
    }, 14000)
  }

  let dataArtists = ''
  songSelect?.song?.artists?.forEach((item) => {
    dataArtists = dataArtists + ' ' + item.name
    return item
  })

  return { animate, timeAnimate, dataArtists }
}
