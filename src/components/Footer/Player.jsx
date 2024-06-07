import {
  IconAfterSound,
  IconBeforeSound,
  IconMusicsRandom,
  IconPause,
  IconPlay,
  IconRepiteSoun
} from '../../icons/Icons'

import { usePlaySong } from '../../hooks/usePlaySong'
import { useEffect, useRef } from 'react'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { useFooterShanges } from '../../hooks/useFooterShanges'
import { InfoReproSong } from './TrackData'
import { Accesibiliti } from './VolumeFooter'
import { usePlayerActions } from '../../hooks/usePlayerActions'
import { IOSSlider } from '../SliderIOS'

export const Footer = () => {
  const audioRef = useRef(null)
  const { songState, currentTime, audioState } = useSelectState()
  const { audioControl, duration, setDuration } = usePlaySong()
  const { songSelect } = useSelectArtistState()
  const { shangeSongHear } = useFooterShanges(audioRef)
  const { playSong, handleTime } = usePlayerActions({ audioRef })

  useEffect(() => {
    audioRef.current.volume = audioState / 100
  }, [])

  useEffect(() => {
    playSong()
  }, [songState, songSelect])

  useEffect(() => {
    setDuration(audioRef.current.duration)

    audioRef.current.addEventListener('timeupdate', (e) => handleTime(e))

    return () => window.removeEventListener('timeupdate', (e) => handleTime(e))
  }, [audioRef])

  return (
    <section className='flex justify-between items-center'>
      <audio src={songSelect?.beat} ref={audioRef} />
      <InfoReproSong />
      <div className='flex flex-col items-center'>
        <div className='flex gap-5 items-center p-3 '>
          <IconMusicsRandom />
          <button
            onClick={() => shangeSongHear('BACK')}
            className='cursor-pointer opacity-60 hover:opacity-100 transition'
          >
            <IconBeforeSound />
          </button>

          <button
            onClick={() =>
              audioControl({
                albumId: songSelect?.albumId,
                song: songSelect?.song,
                list: songSelect?.list,
                type: songSelect?.type_album
              })
            }
            className='bg-textComun hover:scale-110 scale-105 active:scale-95 p-2 w-[32px] h-[32px] flex items-center justify-center rounded-full'
          >
            <figure>{songState ? <IconPause /> : <IconPlay />}</figure>
          </button>

          <button
            onClick={() => shangeSongHear('NEXT')}
            className='cursor-pointer opacity-60 hover:opacity-100 transition'
          >
            <IconAfterSound />
          </button>
          <IconRepiteSoun />
        </div>

        <div className='flex gap-3 items-center h-5 relative overflow-hidden w-[520px]'>
          <div className='w-12 flex justify-end items-center mb-[1px] -mr-[6px]'>
            <p className='text-xs font-variable text-textGray'>
              {currentTime === null
                ? '0.0'
                : `${Math.floor(currentTime / 60)}:${Math.floor(
                    currentTime % 60
                  )}`}
            </p>
          </div>

          <div className='w-[960px] flex items-center'>
            <IOSSlider
              getAriaLabel={() => 'slider'}
              defaultValue={[0]}
              value={currentTime}
              aria-label='ios slider'
              max={
                audioRef.current !== null &&
                Math.floor(audioRef.current.duration)
              }
              min={0}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value
              }}
            />
          </div>

          <div className='w-12 flex items-center mb-1 -ml-2'>
            <p className='text-xs font-sans text-textGray'>
              {isNaN(duration)
                ? '0.0'
                : `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}
            </p>
          </div>
        </div>
      </div>
      <Accesibiliti audioRef={audioRef.current} />
    </section>
  )
}
