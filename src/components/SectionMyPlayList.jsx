import {
  IconBiblioteca,
  IconBibliotecaDeploy,
  IconList,
  IconSearch,
  IconViewMore,
  PlusIcon
} from '../icons/Icons'
import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import TagLikeElement from './TagLikeElement'
import { LikeListSkeleton } from './skeletons/Skeletons'

export const SectionMyListPlayList = ({ loading }) => {
  const { deployNavbar, setDeployNavbar } = useSelectState()
  const { addNewPlaylistCreated, userLibrary } = useSelectArtistState()

  const joinLibrary = [
    ...userLibrary.userFollows,
    ...userLibrary.userPlaylistCreated,
    ...userLibrary.albumsLike
  ]

  return (
    <article className='group w-full rounded-lg bg-groundColor flex flex-col gap-2 p-2 h-full '>
      <div
        className={`${
          deployNavbar ? 'pl-3' : '-ml-2'
        } flex p-2 gap-5 items-center justify-between w-full`}
      >
        <div
          onClick={() => setDeployNavbar(!deployNavbar)}
          className='w-full h-full pl-1 cursor-pointer transition flex items-center justify-center gap-3 opacity-75 hover:opacity-100'
        >
          {!deployNavbar && <IconBiblioteca />}
          {deployNavbar && <IconBibliotecaDeploy />}
          <strong
            className={`${deployNavbar ? 'hidden' : 'block'} text-textWhite`}
          >
            Tu biblioteca
          </strong>
        </div>

        <div className='w-full flex gap-3 items-center justify-end'>
          <figure
            onClick={() => addNewPlaylistCreated()}
            className={`${
              deployNavbar ? 'hidden' : 'block'
            } hover:bg-cardGround hover:opacity-100 transition cursor-pointer opacity-75 w-7 h-7 flex items-center justify-center rounded-full`}
          >
            <PlusIcon />
          </figure>
          <figure
            className={`${
              deployNavbar ? 'hidden' : 'block'
            } hover:bg-cardGround hover:opacity-100 transition cursor-pointer opacity-75 w-7 h-7 flex items-center justify-center rounded-full`}
          >
            <IconViewMore />
          </figure>
        </div>
      </div>

      <span
        className={`${
          deployNavbar ? 'hidden' : 'block'
        } ml-2 w-[75px] backdrop-opacity-60 bg-groundDark font-bold rounded-2xl text-[14px] px-[13px] py-[6px]`}
      >
        Playlists
      </span>
      <div
        className={`${
          deployNavbar ? 'hidden' : 'block'
        } w-full flex items-center justify-between pr-5 pl-1`}
      >
        <figure className='w-9 h-9 flex items-center justify-center rounded-full opacity-75 hover:opacity-100 cursor-pointer hover:bg-groundDark'>
          <IconSearch w={16} h={16} />
        </figure>

        <div className='flex gap-1 items-center hover:scale-105 hover:opacity-100 opacity-75 duration-200 cursor-pointer'>
          <span className='text-textWhite text-sm'>Recientes</span>
          <IconList />
        </div>
      </div>

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
            joinLibrary.map((item, index) => {
              return (
                <>
                  <TagLikeElement
                    hear={item?.hear}
                    key={index}
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
                </>
              )
            })}
        </div>
      </div>
    </article>
  )
}
