import { useParams } from 'react-router'
import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import Header from '../components/Header/Header'
import { useEffect, useState } from 'react'
import { TableListSongs } from '../components/Table'
import { SideBarSong } from '../components/sidebars/SideBars'

export const SongPage = () => {
  const [findSong, setFindSong] = useState()
  const { albums } = useSelectArtistState()
  const { songId } = useParams()
  const { backdropColor, setBackdropColor } = useSelectState()

  useEffect(() => {
    const songFound = albums?.find((song) => {
      return song.id === songId
    })

    setFindSong(songFound)
    setBackdropColor(songFound?.primary_color)
  }, [songId])

  return (
    <div className='w-full h-64 flex flex-col'>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, rgba(18, 18, 18, 0) 95%)`
        }}
        className='w-full transition transition-background -z-10 absolute top-0 h-[804px]'
      />
      <div
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, ${backdropColor} 95%)`
        }}
        className='w-full transition transition-background -z-10 absolute top-0 h-[804px]'
      />
      {/* Header */}

      {findSong && (
        <Header
          title={findSong?.name}
          type={findSong?.type}
          image={findSong?.images[0].url}
          artists={findSong?.description}
          playlist={findSong}
        />
      )}

      <section className='w-full flex flex-col bg-groundColor bg-opacity-30'>
        <SideBarSong
          albumId={findSong?.id}
          list={findSong?.tracks?.items}
          type='album'
          dataSong={findSong}
          albums={albums}
        />
        <TableListSongs
          type='album'
          albums={albums}
          album={findSong?.tracks.items}
          albumId={findSong?.id}
        />
      </section>
    </div>
  )
}

export default SongPage
