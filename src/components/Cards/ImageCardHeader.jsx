import { useSelectArtistState } from '../../hooks/useSelectState'
import { SongIcon } from '../../icons/Icons'

export function ImageCardHeader({ song }) {
  const { userLibrary } = useSelectArtistState()
  const { likeSongsList } = userLibrary

  return (
    <article className='peer w-full h-full max-w-96 shadow-3xl group-hover:bg-cardGround transition-bg duration-300 p-3 flex hover:cursor-pointer flex-col items-center justify-center gap-5 rounded-lg'>
      <div className='z-60 h-full w-full '>
        <figure className='shadow-3xl w-full'>
          {song.type !== 'userPlaylist' && (
            <img
              className='object-contain rounded-[5px]'
              src={
                song?.albumId === 'likedPlaylist'
                  ? 'https://i.ibb.co/r25Lhg2/liked-song-image-big-1.png'
                  : song.image || song.data?.images[0].url || song.images[0].url
              }
              alt='Flyer from the album'
            />
          )}

          {song.type === 'userPlaylist' && !song.data?.image && (
            <figure className='w-full h-[175px] rounded-md bg-secondaryDark grid place-content-center'>
              <SongIcon />
            </figure>
          )}

          {song.type === 'userPlaylist' && song.data.image && (
            <img
              className='object-contain rounded-[5px]'
              src={
                song?.albumId === 'likedPlaylist'
                  ? 'https://i.ibb.co/r25Lhg2/liked-song-image-big-1.png'
                  : song.data?.image ||
                    song.data?.images[0].url ||
                    song.images[0].url
              }
              alt='Flyer from the album'
            />
          )}
        </figure>

        <div className='mt-1 flex gap-1 flex-col'>
          <div className=' '>
            <strong className='font-semibold text-md'>
              {song.data?.name?.length ||
              song.name?.length ||
              song.data?.title?.length > 18
                ? song.data?.name.slice(0, 15) ||
                  song.name.slice(0, 15) ||
                  song.data?.title.slice(0, 15) + '...'
                : song.data?.name || song.name || song.data?.title}
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
  )
}
