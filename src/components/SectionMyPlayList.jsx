import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import { HeaderLibrary } from './Header/HeaderLibrary'
import TagLikeElement from './TagLikeElement'
import { LikeListSkeleton } from './skeletons/Skeletons'

export const SectionMyListPlayList = ({ loading }) => {
  const { deployNavbar } = useSelectState()
  const { userLibrary } = useSelectArtistState()

  const joinLibrary = [
    ...userLibrary.userFollows,
    ...userLibrary.userPlaylistCreated,
    ...userLibrary.albumsLike
  ]

  return (
    <article className='group w-full rounded-lg bg-groundColor flex flex-col gap-2 p-2 h-full '>
      <HeaderLibrary />

      {/* Lista de albumes,canciones, artistas  y playlists que has agregado a tu biblioteca */}
      <div
        className={`${
          deployNavbar ? 'h-[401px]' : 'h-[298px]'
        } user-playlist w-full overflow-hidden relative transition hover:overflow-y-auto flex flex-col gap-2`}
      >
        <div className='w-full transition h-full flex flex-col gap-1'>
          {loading && <LikeListSkeleton />}

          {userLibrary.likeSongsList.items.length > 0 &&
            userLibrary.likeSongsList.items.length > 0 && (
              <TagLikeElement
                hear={userLibrary.likeSongsList.hear}
                url='/collection/tracks'
                imageUrl='https://i.ibb.co/r25Lhg2/liked-song-image-big-1.png'
                name='Tus me gusta'
                type='playlist'
              />
            )}

          {!loading &&
            joinLibrary.length > 0 &&
            joinLibrary.map((item) => {
              return (
                <TagLikeElement
                  hear={item?.hear}
                  key={item.id}
                  url={`/${
                    (item.type === 'artist' && 'artist') ||
                    (item.type === 'userPlaylist' && 'playlist') ||
                    (item.type === 'playlist' && 'song')
                  }/${item.id}`}
                  imageUrl={
                    (item.type === 'userPlaylist' && item.image) ||
                    (item.type === 'artist' && item.images[0].url) ||
                    (item.type === 'playlist' && item?.images[0]?.url)
                  }
                  name={item.name ?? item.title}
                  type={item.type}
                />
              )
            })}
        </div>
      </div>
    </article>
  )
}
