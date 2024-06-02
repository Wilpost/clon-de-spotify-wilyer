import './index.css'
import { Navbar } from './components/Navbar'
import { HeaderListPlaylist } from './components/HeaderListPlaylis'
import { SectionMyListPlayList } from './components/SectionMyPlayList'
import { useEffect, useRef, useState } from 'react'
import { Paths } from './Routing/roots'
import { useFetchSongData } from './hooks/useFetchQuery'
import { useSelectArtistState, useSelectState } from './hooks/useSelectState'
import {
  getAllAlbumsRecommended,
  getAllArtistsData
} from './libs/Firebase/firestore'
import { SectionHomeSkeleton } from './components/skeletons/Skeletons'
import { NotificationBanner } from './components/modals/CreatePlaylistModal'
import { Footer } from './components/Footer/Player'

const App = () => {
  const [loading, setLoading] = useState(false)
  const mainSerctionRef = useRef()

  const { deployNavbar, setBackdropColor, viewModals } = useSelectState()
  const { songSelect, addAlbum, addArtistToList, albums, artists } =
    useSelectArtistState()

  async function fetchDataRequest() {
    try {
      setLoading(true)
      const artists2 = await getAllArtistsData()
      const albums2 = await getAllAlbumsRecommended()

      addArtistToList(artists2)
      addAlbum(albums2)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (albums.length === 0 || artists.length === 0) {
      fetchDataRequest()
    }
  }, [])

  useFetchSongData(mainSerctionRef)
  const asideRef = useRef()

  useEffect(() => {
    if (songSelect.color !== '') {
      setBackdropColor(songSelect.color)
    }
  }, [])

  return (
    <main className='main gap-2'>
      <aside
        ref={asideRef}
        className={`${
          deployNavbar ? 'w-[69px] animate-deployOut' : 'w-[351px]'
        } flex [grid-area:aside] rounded-lg flex-col gap-2 relative overflow-hidden`}
      >
        <Navbar />
        <SectionMyListPlayList loading={loading} />
        <div className='resize group w-2 flex items-center justify-center absolute cursor-grab h-[82%] top-6 left-[360px]'>
          <div className='w-[1px] group-hover:bg-tempBarColor h-full transition' />
        </div>
      </aside>

      <section
        ref={mainSerctionRef}
        className='pt-14 mainSection flex flex-col bg-groundColor gap-4 w-full h-full main-content overflow-hidden [grid-area:main] relative rounded-lg overflow-y-auto transition z-50'
      >
        <div className='z-50'>
          <HeaderListPlaylist />

          {loading && <SectionHomeSkeleton />}
          {!loading && <Paths />}
        </div>
      </section>

      <footer className='[grid-area:footer] h-24'>
        {viewModals.notification && <NotificationBanner />}
        <Footer />
      </footer>
    </main>
  )
}

export default App
