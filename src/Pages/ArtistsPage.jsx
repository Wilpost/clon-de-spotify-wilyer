import { useParams } from 'react-router-dom'
import { AritstHeader } from '../components/Header/Header'
import { SideBararArtists } from '../components/sidebars/SideBars'
import { IconAddedToMyPlaylist, IconPause, IconPlay } from '../icons/Icons'
import { usePlaySong } from '../hooks/usePlaySong'
import { useArtistFunciton } from '../hooks/useArtistFunctions'
import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import { useEffect } from 'react'
import { TableListSongs } from '../components/Table'

const ArtistPage = () => {
  const { artistId } = useParams()
  const { scroll, setScroll, setBackdropColor, backdropColor } =
    useSelectState()
  const { artists, addToLibrary } = useSelectArtistState()
  const { audioControl } = usePlaySong()

  const { artist } = useArtistFunciton(artistId)

  const handleFollowClick = () => {
    setScroll(scroll - 1)
    addToLibrary(artist, 'artist')
  }

  useEffect(() => {
    setBackdropColor(artist.primary_color)
    setScroll(0)
  }, [])

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(18, 18, 18, 0) 32%, ${backdropColor} 180%)`
      }}
      className='w-full h-full'
    >
      <AritstHeader
        image={artist?.backdrop_image}
        name={artist?.name}
        listeners={artist?.followers.total}
      />

      <SideBararArtists
        artist={artist}
        follow={() => handleFollowClick()}
        onClick={() =>
          audioControl({
            albumId: artistId,
            type: 'artist',
            list: artist.trackList,
            albums: artists
          })
        }
      />
      <div className='flex flex-col gap-4 w-full mt-7 px-6 py-2'>
        <h2 className='font-extrabold text-2xl'>Popular</h2>
        <div className='w-full px-1 py-3 flex flex-col items-center gap-2 -mt-2 h-full'>
          {/* {artist.trackList.length > 0 &&
            artist.trackList?.slice(0, 5).map((song, index) => { */}
          {/* return ( */}
          <TableListSongs
            albumId={artistId}
            type='artist'
            album={artist.trackList}
            albums={artists}
            infoBar={false}
          />
          {/* ) */}
          {/* })} */}

          {artist.trackList.length === 0 && (
            <h3 className='text-textGray w-full text-center text-lg'>
              No songs found...
            </h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistPage
