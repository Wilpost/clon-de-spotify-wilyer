import { IconFixed, SongIcon } from '../icons/Icons'
import { useSelectState } from '../hooks/useSelectState'
import { Link, useLocation } from 'react-router-dom'

const TagLikeElement = ({ imageUrl, name, type, fixed = false, url }) => {
  const { pathname } = useLocation()
  const { deployNavbar } = useSelectState()

  return (
    <Link
      onContextMenu={(e) => {
        e.preventDefault()
      }}
      to={url}
      className={`${
        pathname === url
          ? 'bg-textGray bg-opacity-5 hover:bg-opacity-[0.2]'
          : ''
      } p-1 animate-fadeOutIn cursor-pointer hover:bg-textGray hover:bg-opacity-5 hover:rounded-md w-full flex gap-3`}
    >
      {imageUrl && (
        <picture
          className={`${
            type === 'artist'
              ? 'rounded-full h-[49px] w-[62px]'
              : 'rounded-[5px] h-[52px] w-[63px]'
          } relative overflow-hidden`}
        >
          <img
            className='object-contain w-full h-full rounded-lg'
            src={imageUrl}
            alt='Flyer from the album'
          />
        </picture>
      )}

      {!imageUrl && (
        <picture className='w-[60px] grid place-content-center h-[47px] object-contain bg-bgCardRecent bg-opacity-60 rounded-[4px]'>
          <SongIcon w={20} h={20} />
        </picture>
      )}

      <div
        className={`${
          deployNavbar ? 'hidden' : 'block'
        } w-full flex flex-col justify-start`}
      >
        <h1 className='font-normal text-md'>{name}</h1>
        <span className='text-sm mt-[1px] text-opacity-80 text-textGray w-full flex items-center gap-2'>
          {fixed && <IconFixed />}
        </span>
        {type === 'playlist' && (
          <span className='text-sm mt-[1px] text-opacity-80 text-textGray w-full flex items-center gap-2'>
            Playlist <span className='text-[10px]'>•</span> songNumber
          </span>
        )}
        {type === 'artist' && (
          <span className='text-sm mt-[1px] text-opacity-80 text-textGray w-full flex items-center gap-2'>
            Artist
          </span>
        )}
        {type === 'userPlaylist' && (
          <span className='text-sm mt-[1px] text-opacity-80 text-textGray w-full flex items-center gap-2'>
            Playlist <span className='text-[10px]'>•</span> Wilyer Queipo
          </span>
        )}
      </div>
    </Link>
  )
}

export default TagLikeElement
