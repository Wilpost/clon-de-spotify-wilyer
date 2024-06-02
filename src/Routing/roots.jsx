import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoadPageSkeleton } from '../components/skeletons/Skeletons'

const ArtistPage = lazy(() => import('../Pages/ArtistsPage'))
const Home = lazy(() => import('../Pages/Home'))
const SongPage = lazy(() => import('../Pages/SongPage'))
const MyPlaylistPage = lazy(() => import('../Pages/MyPlaylistPage'))
const PlaylistPage = lazy(() => import('../Pages/PlaylistPage'))

export const Paths = () => {
  return (
    <Suspense fallback={<LoadPageSkeleton />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='song/:songId' element={<SongPage />} />
        <Route path='collection/tracks' element={<MyPlaylistPage />} />
        <Route path='playlist/:id' element={<PlaylistPage />} />
        <Route path='artist/:artistId' element={<ArtistPage />} />
      </Routes>
    </Suspense>
  )
}
