import { TableListSongs } from '../components/Table'
import { CreatePlaylistModal } from '../components/modals/CreatePlaylistModal'
import { SideBarSong } from '../components/sidebars/SideBars'
import { useSelectState } from '../hooks/useSelectState'
import { SongIcon } from '../icons/Icons'
import { useLocation, useParams } from 'react-router'
import { fetchImageColor } from '../libs/get_image_color'
import { useEffect, useState } from 'react'

export const PlaylistPage = () => {
  const { pathname } = useLocation()
  const { viewModals, setViewModals, setBackdropColor } = useSelectState()
  const [color, setColor] = useState('')

  const { userPlaylistCreated } = useSelectState()
  const { id } = useParams()

  const songFound = userPlaylistCreated.find((playlist) => playlist.id === id)

  useEffect(() => {
    if (
      (!songFound?.image && songFound.songs[0]) ||
      (songFound?.image && songFound.songs[0])
    ) {
      songFound.image = songFound.songs[0].album.images[0].url
      fetchImageColor(songFound.songs[0].album.images[0].url).then((hex) =>
        setColor(hex)
      )
    } else if (songFound.songs.length === 0) {
      setColor('')
    } else {
      setColor('')
    }

    setBackdropColor(color)
  }, [pathname])

  return (
    <>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, ${
            color === '' ? '#2d2c2cd1' : color
          } 95%)`
        }}
        className='w-full animate-fadeIn transition-background z-0 absolute top-0 h-[839px] opacity-75'
      />
      <section className='w-full h-[270px] items-end flex gap-7 p-5 relative overflow-hidden'>
        {songFound?.image && (
          <figure className='max-w-80 w-72 h-50'>
            <img
              className='object-cover rounded-md shadow-4xl'
              src={songFound?.image}
              alt='Backdrop of song or playlist'
            />
          </figure>
        )}

        {!songFound?.image && songFound.songs[0] && (
          <figure className='max-w-80 w-72 h-50'>
            <img
              className='object-cover rounded-md shadow-4xl'
              src={songFound.image}
              alt='Backdrop of song or playlist'
            />
          </figure>
        )}

        {!songFound?.image && !songFound.songs[0] && (
          <figure className='w-72 shadow-arrowGround grid place-content-center h-full bg-opacity-60 max-w-80 rounded-md bg-groundColor'>
            <SongIcon w={90} h={90} />
          </figure>
        )}
        <article className='flex flex-col w-full h-full justify-end'>
          <div className='w-full flex flex-col gap-2'>
            <span className='text-md -mb-5'>Playlist</span>
            <h1
              onClick={() => setViewModals({ createPlaylist: true })}
              className='text-[100px] h-full flex cursor-pointer leading-[95px] w-full font-extrabold -ml-1'
            >
              {songFound?.title?.length > 20
                ? songFound?.title?.slice(0, 20) + '...'
                : songFound?.title}
              {!songFound?.title && 'Playlist Nro 1'}
            </h1>
          </div>

          <div className='w-full flex flex-col gap-2 item-center'>
            <strong className='font-normal text-[#c1c1c1] text-sm mt-1'>
              {songFound?.description}
            </strong>
            <span className='w-full flex gap-1 items-center text-textGray'>
              <span className='text-textWhite'>
                {songFound?.songs?.length} canciones, 1h 38 min
              </span>
            </span>
          </div>
        </article>
      </section>
      <div
        aria-disabled={songFound?.songs?.length === 0}
        className={`${
          songFound?.songs?.length === 0
            ? 'opacity-75 cursor-default'
            : 'flex flex-col gap-3 relative bg-opacity-20 bg-groundColor'
        }`}
      >
        <SideBarSong
          likeOption={false}
          disabled={songFound?.songs?.length === 0}
        />
        <TableListSongs album={songFound.songs} albumId={songFound.id} />
      </div>
      {viewModals.createPlaylist && <CreatePlaylistModal id={id} />}
    </>
  )
}

export default PlaylistPage