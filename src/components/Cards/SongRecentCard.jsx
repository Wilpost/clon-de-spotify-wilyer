import { Link } from 'react-router-dom'
import { usePlaySong } from '../../hooks/usePlaySong'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { IconPause, IconPlay, SongIcon } from '../../icons/Icons'

export const CardSongRecent = ({ song }) => {
  const { albums, userLibrary, artists } = useSelectArtistState()
  const { audioControl } = usePlaySong()
  const { setBackdropColor, deployNavbar } = useSelectState()
  const { likeSongsList, userPlaylistCreated } = userLibrary

  const handleHover = () => {
    setBackdropColor(song.data?.primary_color ?? song.primary_color)
  }

  return (
    <div
      className={`${
        deployNavbar ? 'h-16' : 'h-12'
      } group w-full relative overflow-hidden z-[77777]`}
    >
      <Link
        className='h-full'
        to={`${
          (song.type === 'myPlaylist' && '/collection/tracks') ||
          (song.type === 'userPlaylist' && `/playlist/${song.data.id}`) ||
          `${song.type === 'artist' ? 'artist' : 'song'}/${song.data?.id}`
        }`}
      >
        <article
          onMouseMove={() => handleHover()}
          className='h-full shadow-3xl hover:bg-[#9c9c9c5e] bg-bgCardRecent flex items-center bg-opacity-10 hover:cursor-pointer overflow-hidden rounded-[4px] min-w-[200px] w-full'
        >
          <div className='w-full h-full flex gap-3 z-60 items-center justify-around'>
            <div className='flex items-center h-full gap-2 w-full'>
              <picture className={`w-14 shadow-rigth h-20`}>
                {song.type !== 'userPlaylist' && (
                  <img
                    className={`${
                      deployNavbar ? 'object-cover' : 'object-contain'
                    } w-full h-full`}
                    src={
                      song.albumId === 'likedPlaylist'
                        ? 'https://i.ibb.co/r25Lhg2/liked-song-image-big-1.png'
                        : song.data.images[0].url || song.data.image
                    }
                    alt='Flyer from the album'
                  />
                )}

                {song.type === 'userPlaylist' && !song.data.image && (
                  <figure className='w-full h-full rounded-md bg-secondaryDark grid place-content-center'>
                    <SongIcon />
                  </figure>
                )}

                {song.type === 'userPlaylist' && song.data.image && (
                  <img
                    className={`${
                      deployNavbar ? 'object-cover' : 'object-contain'
                    } w-full h-full`}
                    src={song.data.image}
                    alt='Flyer from the album'
                  />
                )}
              </picture>

              <div className='flex items-center'>
                <strong className='font-bold text-sm'>
                  {song.data?.title ?? song.data?.name}
                </strong>
              </div>
            </div>

            <figure
              className={`${
                song?.hear ? 'visible' : 'invisible'
              } w-5 mr-4 group-hover:invisible group-hover:opacity-0 visible opacity-100`}
            >
              <img
                src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
                alt='Gif sound wave'
              />
            </figure>
          </div>
        </article>
      </Link>

      <div className='h-full z-20 right-2 group-hover:opacity-100 invisible opacity-0 top-0 group-hover:visible flex absolute items-center'>
        <button
          onClick={() =>
            audioControl({
              albumId:
                song.type === 'myPlaylist'
                  ? 'likedPlaylist'
                  : song.data?.id ?? song.id,
              type:
                song.type === 'userPlaylist' ? 'myPlaylistCreated' : song.type,
              list:
                (song?.type === 'myPlaylist' && likeSongsList.items) ||
                (song?.type === 'artist' && song.data?.trackList) ||
                (song?.type === 'album' && song.data?.tracks?.items) ||
                (song?.type === 'playlist' && song.data?.tracks?.items) ||
                (song?.type === 'userPlaylist' && song.data?.songs),
              albums:
                (song?.type === 'myPlaylist' && likeSongsList.items) ||
                (song?.type === 'album' && albums) ||
                (song?.type === 'userPlaylist' && userPlaylistCreated) ||
                (song?.type === 'artist' && artists)
            })
          }
          className='bg-textGreenSpotify z-70 scale-105 hover:scale-110 active:scale-95 p-3 w-[33px] h-[33px] grid place-content-center rounded-full'
        >
          {song?.hear && <IconPause w={15} h={15} />}
          {!song?.hear && <IconPlay w={15} h={15} />}
        </button>
      </div>
    </div>
  )
}
