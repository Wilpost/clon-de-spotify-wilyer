import { useEffect } from 'react'
import { useInfoReproSong } from '../../hooks/useInfoReprosong'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { ContextMenuOptions } from '../modals/CreatePlaylistModal'
import { SongIcon } from '../../icons/Icons'
import { ButtonLikeMedium } from '../buttons/ButtonLikeMedium'

export const InfoReproSong = () => {
  const { songSelect } = useSelectArtistState()
  const { timeAnimate, animate, dataArtists } = useInfoReproSong()
  const { viewModals } = useSelectState()

  useEffect(() => {
    timeAnimate()
  }, [songSelect])

  return (
    <div className='max-w-[291px] w-full flex gap-5 items-center'>
      {viewModals.addSongToList && (
        <ContextMenuOptions song={songSelect.song} />
      )}

      {songSelect?.song?.name && (
        <img
          className='rounded-sm w-[59px] h-[59px]'
          src={songSelect?.song?.album?.images[0].url}
          alt='Flyer to img song'
        />
      )}

      {!songSelect?.song?.name && (
        <figure className='w-[94px] h-[59px] rounded-md bg-secondaryDark grid place-content-center'>
          <SongIcon />
        </figure>
      )}

      <div className='w-full flex flex-col gap-1 relative overflow-hidden'>
        {songSelect?.song?.name?.length > 45 && animate && (
          <div className='w-3 h-[18px] -left-2 absolute bg-arrowGround z-[88888] blur-sm' />
        )}

        <h3
          onMouseOver={() => timeAnimate()}
          style={{
            width: songSelect?.song?.name?.length * 10
          }}
          className={`relative z-[777] overflow-hidden ${
            songSelect?.song?.name?.length > 45 &&
            animate &&
            'animate-translateIn'
          } text-sm font-medium`}
        >
          {songSelect?.song?.name}
          {!songSelect?.song?.name && 'Title Song'}
        </h3>

        {songSelect?.song?.name?.length > 45 && (
          <div className='w-4 h-[18px] -right-2 absolute bg-arrowGround top-0 z-[88888] blur-sm' />
        )}

        <span className='text-xs flex gap-2 text-textGray w-full'>
          {songSelect?.song?.name
            ? `${
                dataArtists.length > 30
                  ? `${dataArtists.slice(0, 28)}...`
                  : dataArtists
              }`
            : 'Artist'}
        </span>
      </div>

      <ButtonLikeMedium song={songSelect.song} />
    </div>
  )
}
