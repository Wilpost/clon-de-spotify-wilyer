import { useSelectState } from '../../hooks/useSelectState'
import { IconVerifiedArtist, SongIcon } from '../../icons/Icons'

const Header = ({
  image,
  title = 'Unknow',
  type = 'Album',
  artists = [],
  playlist = []
}) => {
  return (
    <section className='w-full h-64 items-end flex gap-7 p-5'>
      {image && (
        <figure className='max-w-80 w-72 h-50'>
          <img
            className='object-cover rounded-md shadow-4xl'
            src={image}
            alt='Backdrop of song or playlist'
          />
        </figure>
      )}
      {!image && (
        <figure className='w-72 shadow-arrowGround grid place-content-center h-50 max-w-80 rounded-md bg-secondaryDark'>
          <SongIcon w={90} h={90} />
        </figure>
      )}
      <article className='flex flex-col w-full h-full justify-end'>
        <div className='w-full flex flex-col gap-4'>
          <span className='text-md -mb-5'>
            {type === 'playlist' ? 'Playlist' : 'Song'}
          </span>
          <h1 className='text-[80px] h-full flex leading-[70px] w-full font-extrabold -ml-1'>
            {title?.length > 20 ? title?.slice(0, 20) + '...' : title}
          </h1>
        </div>

        <div className='w-full flex flex-col gap-2 item-center'>
          <span className='w-full flex flex-col gap-2 items-start text-textGray'>
            <strong className='font-normal text-textGray text-sm mt-1'>
              {artists}
            </strong>{' '}
            <span className='text-textWhite'>
              {playlist.length} canciones, 1h 38 min
            </span>
          </span>
        </div>
      </article>
    </section>
  )
}

export const AritstHeader = ({ image, name, listeners }) => {
  const { deployNavbar } = useSelectState()

  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundPositionY: deployNavbar ? '-115px' : '-25px',
        backgroundPositionX: deployNavbar ? '84px' : '352px',
        backgroundSize: deployNavbar ? '1263px' : '994px'
      }}
      className='w-full h-[261px] items-end bg-fixed bg-cover bg-no-repeat bg-black flex z-[33333] -top-14 gap-7 p-5 relative overflow-hidden'
    >
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%)'
        }}
        className='w-full h-44 absolute opacity-40 -z-10 bottom-0 left-0'
      />
      <article className='flex flex-col gap-8 w-full h-full justify-end'>
        <h3 className='font-semibold flex gap-1 relative overflow-hidden items-center text-sm'>
          <IconVerifiedArtist /> Artista verificado
          <div className='bg-white w-4 h-3 absolute left-1 -z-20' />
        </h3>
        <h1 className='text-[90px] flex leading-[70px] w-full font-black -ml-1'>
          {name}
        </h1>

        <div className='w-full flex flex-col gap-2 item-center'>
          <span className='w-full flex flex-col gap-2 items-start text-textGray'>
            <span className='text-textWhite'>
              {listeners} oyentes mensuales
            </span>
          </span>
        </div>
      </article>
    </section>
  )
}

export default Header
