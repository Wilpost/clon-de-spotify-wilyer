import { useParams } from 'react-router-dom'
import { AritstHeader } from '../components/Header/Header'
import { SideBararArtists } from '../components/sidebars/SideBars'
import { IconAddedToMyPlaylist, IconPause, IconPlay } from '../icons/Icons'
import { usePlaySong } from '../hooks/usePlaySong'
import { useArtistFunciton } from '../hooks/useArtistFunctions'
import { useSelectArtistState, useSelectState } from '../hooks/useSelectState'
import { useEffect } from 'react'

const ArtistPage = () => {
  const { artistId } = useParams()
  const { addToLibrary, scroll, setScroll } = useSelectState()
  const { artists } = useSelectArtistState()
  const { audioControl } = usePlaySong()
  const { artist, existSongInPlaylist } = useArtistFunciton(artistId)

  const handleFollowClick = () => {
    // setFollow(userLibrary.some((item) => item.id === artist.id))
    setScroll(scroll - 1)
    addToLibrary(artist)
  }

  useEffect(() => {
    setScroll(0)
  }, [])

  return (
    <div
      style={{
        background:
          'linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, #383838 95%)'
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
          {artist.trackList.length > 0 &&
            artist.trackList?.slice(0, 5).map((song, index) => {
              return (
                <div
                  key={song?.id}
                  className='group h-14 hover:bg-tempBarColor transition cursor-pointer hover:bg-opacity-50 rounded-md flex  w-full justify-between items-center px-3'
                >
                  <div className='flex group items-center'>
                    {!song.hear && (
                      <div className='block group-hover:hidden w-5'>
                        <span className='text-sm text-textGray relative'>
                          {index + 1}
                        </span>
                      </div>
                    )}

                    {song.hear && (
                      <figure className='h-full block group-hover:hidden w-5'>
                        <img
                          className='w-4'
                          src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
                          alt='Gif sound wave'
                        />
                      </figure>
                    )}

                    <div className='hidden group-hover:block w-5'>
                      <button
                        onClick={() => {
                          audioControl({
                            type: 'artist',
                            albumId: song.album.id,
                            song,
                            list: artist.trackList
                          })
                        }}
                      >
                        {song?.hear && <IconPause w={14} h={14} color='#fff' />}
                        {!song?.hear && (
                          <IconPlay className='fill-textWhite' w={13} h={13} />
                        )}
                      </button>
                    </div>

                    <div className='w-[443px] flex gap-3 items-center p-2'>
                      <img
                        className='rounded-md w-[40px] h-[40px]'
                        src={song?.album.images[0].url}
                        alt='Flyer to img song'
                      />
                      <div className='w-full flex flex-col'>
                        <span
                          className={`${
                            song?.hear ? 'text-textGreenSpotify' : 'text-white'
                          } w-full`}
                        >
                          {song?.name}
                        </span>
                        <small className='text-textGray flex gap-1 w-full'>
                          {song?.album.artists.map((artist, i) => {
                            if (
                              song?.album.artists[i + 1] === undefined &&
                              i <= 3
                            ) {
                              return (
                                <span key={i} className='hover:underline'>
                                  {artist.name}
                                </span>
                              )
                            }
                            return (
                              <span key={i} className='hover:underline'>
                                {`${artist.name}, `}
                              </span>
                            )
                          })}
                        </small>
                      </div>
                    </div>
                  </div>

                  <span className='text-sm text-textGray w-[318px]'>
                    {song.album.name}
                  </span>

                  <span className='mr-8 -ml-9 w-8 invisible group-hover:visible'>
                    {existSongInPlaylist(song.id) && <IconAddedToMyPlaylist />}
                  </span>

                  <span className='text-textGray mb-2'>
                    {`${Math.floor(song.duration_ms % 60)}:${Math.floor(
                      song.duration_ms % 60
                    )}`}
                  </span>
                </div>
              )
            })}

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
