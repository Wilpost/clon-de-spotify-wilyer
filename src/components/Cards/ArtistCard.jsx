import { Link } from 'react-router-dom'
import { usePlaySong } from '../../hooks/usePlaySong'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { ButtonSpotify } from '../buttons/ButtonSpotify'

export const CardArtist = ({ song }) => {
  const { artists } = useSelectArtistState()
  const { deployNavbar } = useSelectState()
  const { audioControl } = usePlaySong()

  const handleClick = async () => {
    audioControl({
      type: 'artist',
      albumId: song?.data?.id ?? song?.id,
      list: song?.data?.trackList ?? song?.trackList,
      albums: artists
    })
  }

  return (
    <article
      className={`${
        deployNavbar ? 'w-[205px]' : 'w-[202px]'
      } h-[272px] relative overflow-hidden group`}
    >
      <Link
        to={`artist/${song?.data?.id ?? song?.id}`}
        className='peer z-70 w-full h-full '
      >
        <article className='peer w-full h-full max-w-96 relative shadow-3xl group-hover:bg-cardGround transition-bg duration-300  p-3 flex hover:cursor-pointer flex-col items-center justify-center gap-5 rounded-lg'>
          <div className='z-60 h-full w-full'>
            <figure
              className={` h-[172px] shadow-3xl w-[165px] relative overflow-hidden rounded-full`}
            >
              <img
                className='object-contain rounded-full'
                src={song?.data?.images[1]?.url ?? song?.images[1].url}
                alt='Flyer from the album'
              />
            </figure>

            <div className='mt-1 flex gap-1 flex-col'>
              <div className=' '>
                <strong className='font-medium text-md'>
                  {song?.data?.name.length ?? song?.name.length > 18
                    ? song?.data?.name.slice(0, 15) ??
                      song?.name.slice(0, 15) + '...'
                    : song?.data?.name ?? song?.name}
                </strong>
              </div>
              <div>
                <p className='text-sm text-textGray font-medium'>Artista</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
      <div
        className={`${
          song?.hear
            ? 'visible opacity-100 translate-y-[-10px]'
            : 'invisible opacity-0'
        } right-[20px] peer top-[160px] z-40 hover:translate-y-[-10px] hover:visible hover:opacity-100 transition-translate duration-300 peer-hover:translate-y-[-10px] peer-hover:opacity-100 peer-hover:visible flex absolute justify-end items-center`}
      >
        <ButtonSpotify onClick={handleClick} song={song.data ?? song} />
      </div>
    </article>
  )
}
