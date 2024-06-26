import ListPlaylist from '../components/ListsPlaylist'
import SectionInfoTrends from '../components/SectionInfoTrends'

import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'

const Home = () => {
  const { albums, artists } = useSelectArtistState()
  const { backdropColor, deployNavbar, recentHeardSongs } = useSelectState()

  return (
    <>
      <div
        style={{
          background: backdropColor
        }}
        className='w-full brightness-50 animate-fadeIn transition-color z-0 absolute duration-500 top-0 h-[348px] opacity-75'
      />
      <div
        style={{
          background: `linear-gradient(180deg, rgba(2,0,36,0) 0%, #121212 100%)`
        }}
        className='w-full absolute z-[1111] h-[330px] top-[19px]'
      />

      {recentHeardSongs.length > 0 && (
        <header
          className={`${
            deployNavbar ? 'gap-[10px]' : 'gap-[6px]'
          } pl-7 p-4 w-full grid grid-cols-recentCardsGrid grid-rows-[repeat(2, minmax(8px, 50px))]`}
        >
          <ListPlaylist />
        </header>
      )}

      <section className='w-full flex mb-4 flex-col gap-7 pl-4'>
        <SectionInfoTrends
          title='Hecho para Wilyer'
          list={albums}
          typeCard='card'
        />

        <SectionInfoTrends
          title='Artistas populares'
          list={artists}
          typeCard='artist'
        />

        {recentHeardSongs.length !== 0 && (
          <SectionInfoTrends
            title='Escuchados recientemente'
            list={recentHeardSongs}
          />
        )}
      </section>
    </>
  )
}

export default Home
