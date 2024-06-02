import { Link } from 'react-router-dom'
import { usePlaySong } from '../../hooks/usePlaySong'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { IconPause, IconPlay } from '../../icons/Icons'

export const CardSongRecent = ({ song }) => {
  const { likeSongsList, albums } = useSelectArtistState()
  const { audioControl } = usePlaySong()
  const { setBackdropColor } = useSelectState()

  const handleHover = () => {
    setBackdropColor(song.data.primary_color)
  }

  return (
    <div className={`h-12 group w-full relative overflow-hidden z-[77777]`}>
      <Link
        className='h-full'
        to={`/${song.type === 'artist' ? 'artist' : 'song'}/${song.data?.id}`}
      >
        <article
          onMouseMove={() => handleHover()}
          // onMouseOut={() => handleOutHover()}
          className='h-full shadow-3xl hover:bg-[#9c9c9c5e] bg-bgCardRecent flex items-center bg-opacity-10 hover:cursor-pointer overflow-hidden rounded-[4px] min-w-[200px] w-full'
        >
          <div className='w-full h-full flex gap-3 z-60 items-center justify-around'>
            <div className='flex items-center h-full gap-2 w-full'>
              <picture className={`w-14 shadow-rigth h-20`}>
                <img
                  className='object-contain w-full h-full'
                  src={
                    song.albumId === 'likedPlaylist'
                      ? 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
                      : song.data.images[0].url
                  }
                  alt='Flyer from the album'
                />
              </picture>
              <div className='flex items-center'>
                <strong className='font-bold text-sm'>{song.data?.name}</strong>
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
              albumId: song?.albumId,
              type: song.type,
              list:
                (song?.type === 'myPlaylist' && likeSongsList.items) ||
                (song?.type === 'artist' && song.data?.trackList) ||
                (song?.type === 'album' && song.data?.tracks?.items),
              albums: song?.albumId === 'likedPlaylist' ? albums : likeSongsList
            })
          }
          className='bg-[#571ed7] z-70 scale-105 hover:scale-110 active:scale-95 p-3 w-[33px] h-[33px] grid place-content-center rounded-full'
        >
          {song?.hear && <IconPause w={15} h={15} />}
          {!song?.hear && <IconPlay w={15} h={15} />}
        </button>
      </div>
    </div>
  )
}
