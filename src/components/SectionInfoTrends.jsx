import { useSelectState } from '../hooks/useSelectState'
import { CardArtist } from './Cards/ArtistCard'
import { CardPlaylists } from './Cards/CardSong'

const SectionInfoTrends = ({ title, list = [], typeCard = '' }) => {
  const { deployNavbar } = useSelectState()

  return (
    <div className='w-full h-full flex flex-col gap-4 mt-5 -mb-7 z-[3333]'>
      <nav className='w-full'>
        <ul className='w-full -mb-2 pl-3 flex space-between items-center pr-4'>
          <a
            href='#'
            className='w-full hover:underline text-[23px] text-white font-extrabold'
          >
            {title}
          </a>
          <a
            href='#'
            className='w-full hover:underline text-end text-textGray text-sm font-bold'
          >
            Mostrar más
          </a>
        </ul>
      </nav>
      <section className='w-full flex'>
        {typeCard === 'card' &&
          list?.slice(0, deployNavbar ? 6 : 5).map((song) => {
            return <CardPlaylists song={song} key={song?.id} />
          })}

        {typeCard === 'artist' &&
          list?.slice(0, deployNavbar ? 6 : 5).map((song) => {
            return <CardArtist song={song} key={song?.id} />
          })}

        {typeCard === '' &&
          list?.slice(0, deployNavbar ? 6 : 4).map((song) => {
            return song.type === 'artist' ? (
              <CardArtist song={song} key={song?.id} />
            ) : (
              <CardPlaylists song={song} key={song?.id} />
            )
          })}
      </section>
    </div>
  )
}

export default SectionInfoTrends
