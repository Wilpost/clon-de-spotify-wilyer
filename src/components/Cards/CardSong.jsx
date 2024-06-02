import { Link } from 'react-router-dom'
import { usePlaySong } from '../../hooks/usePlaySong'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { ButtonSpotify } from '../buttons/ButtonSpotify'

export const CardPlaylists = ({ song }) => {
  const { albums, likeSongsList } = useSelectArtistState()
  const { deployNavbar } = useSelectState()
  const { audioControl } = usePlaySong()

  return (
    <article
      className={`${
        deployNavbar ? 'w-[206px]' : 'w-[198px]'
      } h-[272px] relative overflow-hidden group`}
    >
      <Link
        to={`song/${song.data?.id ?? song.id}`}
        className='peer z-70 w-full h-full bg-cardGround'
      >
        <article className='peer w-full h-full max-w-96 shadow-3xl group-hover:bg-cardGround transition-bg duration-300 p-3 flex hover:cursor-pointer flex-col items-center justify-center gap-5 rounded-lg'>
          <div className='z-60 h-full w-full '>
            <figure className='shadow-3xl w-full'>
              <img
                className='object-contain rounded-[5px]'
                src={
                  song?.albumId === 'likedPlaylist'
                    ? 'public/images/liked-song-image-big.png'
                    : song.data?.images[0].url ?? song.images[0].url
                }
                alt='Flyer from the album'
              />
            </figure>

            <div className='mt-1 flex gap-1 flex-col'>
              <div className=' '>
                <strong className='font-semibold text-md'>
                  {song.data?.name.length ?? song.description.length > 18
                    ? song.data?.name.slice(0, 15) ??
                      song.name.slice(0, 15) + '...'
                    : song.data?.name ?? song.name}
                </strong>
              </div>
              <div>
                <p className='text-sm text-textGray'>
                  {song?.albumId === 'likedPlaylist' &&
                    `${likeSongsList.items.length} canciones`}

                  {!song.data && song.description?.length > 19
                    ? song.description.slice(0, 46) + '...'
                    : song?.description}

                  {song.data && song.data?.description?.length > 19
                    ? song.data?.description.slice(0, 45) + '...'
                    : song.data?.description}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
      <div
        className={`${
          song.data?.hear ?? song?.hear
            ? 'visible opacity-100 translate-y-[-10px]'
            : 'invisible opacity-0'
        } right-[20px] peer top-[160px] z-40 hover:translate-y-[-10px] hover:visible hover:opacity-100 transition-translate duration-300 peer-hover:translate-y-[-10px] peer-hover:opacity-100 peer-hover:visible flex absolute justify-end items-center`}
      >
        <ButtonSpotify
          onClick={() =>
            audioControl({
              albumId:
                song.type === 'myPlaylist'
                  ? 'likedPlaylist'
                  : song.data?.id ?? song.id,
              list:
                song.type === 'myPlaylist'
                  ? likeSongsList.items
                  : song.data?.tracks?.items ?? song.tracks?.items,
              type: song.type === 'myPlaylist' ? 'myPlaylist' : 'album',
              albums: song.type === 'myPlaylist' ? likeSongsList.items : albums
            })
          }
          song={song.data ?? song}
        />
      </div>
    </article>
  )
}
