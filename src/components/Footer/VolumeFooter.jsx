import { useRef } from 'react'
import { storeConfig } from '../../Store/storeConfig'
import { useSelectState } from '../../hooks/useSelectState'
import {
  CompleteVolume,
  EmptyVolume,
  FirstVolume,
  IconMicrophone,
  IconPlaylistTail,
  MedioVolume,
  ShangeToFullScreenIcon,
  ShangeViewportSongIcon,
  ViewSong
} from '../../icons/Icons'
import { IOSSlider } from '../SliderIOS'

export const Accesibiliti = ({ audioRef }) => {
  const { setAudioState, audioState } = useSelectState()
  const volume = storeConfig((state) => state.volume)
  const refAudioState = useRef(audioState)

  return (
    <article
      className='flex gap-3
     items-center justify-center h-full'
    >
      <ViewSong className='opacity-60 hover:opacity-100 hover:fill-textWhite transition cursor-pointer active:fill-textGreenSpotify' />
      <IconMicrophone />
      <IconPlaylistTail />
      <div className='w-28 flex items-center gap-[5px]'>
        <figure
          className='cursor-pointer'
          onClick={() => {
            audioState === 0
              ? setAudioState(refAudioState.current)
              : setAudioState(0)

            audioState !== 0 && (audioRef.volume = 0)
            audioState === 0 && (audioRef.volume = refAudioState.current / 100)

            refAudioState.current = audioState
          }}
        >
          {volume === 0 && (
            <EmptyVolume
              className='opacity-60 hover:opacity-100 transition focus:fill-textGreenSpotify'
              w={19}
              h={17}
            />
          )}
          {volume > 0 && volume < 30 && (
            <FirstVolume
              className='opacity-60 hover:opacity-100 transition'
              w={19}
              h={17}
            />
          )}
          {volume >= 30 && volume < 60 && (
            <MedioVolume
              className='opacity-60 hover:opacity-100 transition'
              w={19}
              h={17}
            />
          )}
          {volume >= 60 && (
            <CompleteVolume
              className='opacity-60 hover:opacity-100 transition'
              w={19}
              h={17}
            />
          )}
        </figure>

        <IOSSlider
          aria-label='Slider Volume'
          value={volume}
          onChange={(e) => {
            audioRef.volume = e.target.value / 100
            setAudioState(e.target.value)
          }}
          max={100}
          min={0}
        />
      </div>
      <ShangeViewportSongIcon />
      <ShangeToFullScreenIcon />
    </article>
  )
}
