import { useEffect } from 'react'
import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import Header from '../components/Header/Header'
import { TableListSongs } from '../components/Table'
import { SideBarSong } from '../components/sidebars/SideBars'

const MyPlaylistPage = () => {
  const { likeSongsList } = useSelectArtistState()
  const { setBackdropColor } = useSelectState()

  useEffect(() => {
    setBackdropColor('#6039ee')
  }, [])

  return (
    <div className='w-full h-64'>
      <div
        style={{
          background:
            'linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, #6039ee 95%)'
        }}
        className='w-full transition transition-background -z-10 absolute top-0 h-[804px] opacity-75'
      />

      {/* Header */}

      <Header
        title='Tus me gusta'
        image='https://misc.scdn.co/liked-songs/liked-songs-300.png'
        playlist={likeSongsList.items}
        type='Album'
      />

      <section className='w-full bg-groundColor bg-opacity-30'>
        <SideBarSong
          likeOption={false}
          dataSong={likeSongsList}
          type='myPlaylist'
          albumId='likedPlaylist'
          list={likeSongsList.items}
          options={false}
          albums={likeSongsList.items}
        />
        <TableListSongs
          type='myPlaylist'
          album={likeSongsList.items}
          albumId='likedList'
        />
      </section>
    </div>
  )
}

export default MyPlaylistPage
