import { usePlaySong } from '../../hooks/usePlaySong'
import { useSelectArtistState } from '../../hooks/useSelectState'
import { IconList, IconMusicsRandom, IconOptions } from '../../icons/Icons'
import { ButtonLikeBig } from '../buttons/ButtonLikeBig'
import { ButtonSpotify } from '../buttons/ButtonSpotify'

export const SideBarSong = ({
  dataSong = {},
  list,
  albumId,
  disabled,
  type,
  albums,
  likeOption = true
}) => {
  const { audioControl } = usePlaySong()

  return (
    <aside className='flex items-center justify-between w-full z-50 h-full p-6 '>
      <div className='flex items-center gap-5'>
        <ButtonSpotify
          big
          disabled={disabled}
          onClick={() =>
            audioControl({
              albumId,
              list,
              type,
              albums
            })
          }
          song={dataSong}
        />
        <IconMusicsRandom w={26} h={26} disabled={disabled} />
        {likeOption && (
          <>
            <ButtonLikeBig song={dataSong} />
          </>
        )}
        <IconOptions w={28} h={28} disabled={disabled} />
      </div>

      <div>
        <span className='w-full flex items-center gap-2 opacity-75 hover:opacity-100 cursor-pointer'>
          Lista <IconList />
        </span>
      </div>
    </aside>
  )
}

export const SideBararArtists = ({ artist, onClick, follow }) => {
  const { userLibrary } = useSelectArtistState()

  const existInLibrary = userLibrary.find((item) => item.id === artist.id)

  return (
    <aside className='flex items-center -mt-9 justify-between w-full z-50 h-16 p-6 '>
      <div className='flex items-center gap-5 relative'>
        <ButtonSpotify song={artist} onClick={onClick} big />
        <button
          onClick={() => follow()}
          className='rounded-3xl py-1 px-3 border-[1px] font-bold border-tempBarColor bg-transparent text-textWhite'
        >
          {existInLibrary ? 'Siguiendo' : 'Seguir'}
        </button>
        <IconOptions w={28} h={28} />
      </div>

      <div>
        <span className='w-full flex items-center gap-2 opacity-75 hover:opacity-100 cursor-pointer'>
          Lista <IconList />
        </span>
      </div>
    </aside>
  )
}
