import { Link } from 'react-router-dom'
import { useSelectState } from '../../hooks/useSelectState'
import { ButtonSpotify } from '../buttons/ButtonSpotify'
import { ImageCardHeader } from './ImageCardHeader'

export const CardPlaylists = ({ song }) => {
  const { deployNavbar } = useSelectState()

  return (
    <article
      className={`${
        deployNavbar ? 'w-[206px]' : 'w-[198px]'
      } h-[272px] relative overflow-hidden group`}
    >
      <Link
        to={`${
          (song.type === 'userPlaylist' &&
            `/playlist/${song.data?.id ?? song.id}`) ||
          (song.type === 'myPlaylist' && '/collection/tracks') ||
          (song.type === 'album' && `/song/${song.data?.id ?? song.id}`) ||
          (song.type === 'playlist' && `/song/${song.data?.id ?? song.id}`)
        }`}
        className='peer z-70 w-full h-full bg-cardGround'
      >
        <ImageCardHeader song={song} />
      </Link>

      <div
        className={`${
          song.data?.hear ?? song?.hear
            ? 'visible opacity-100 translate-y-[-10px]'
            : 'invisible opacity-0'
        } right-[20px] peer top-[160px] z-40 hover:translate-y-[-10px] hover:visible hover:opacity-100 transition-translate duration-300 peer-hover:translate-y-[-10px] peer-hover:opacity-100 peer-hover:visible flex absolute justify-end items-center`}
      >
        <ButtonSpotify
          song={(song?.type === 'myPlaylist' && song) || song.data || song}
        />
      </div>
    </article>
  )
}
