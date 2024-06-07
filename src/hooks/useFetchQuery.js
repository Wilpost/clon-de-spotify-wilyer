import { getAlbumsRecommended } from '../services/Albums'
import { useSelectArtistState, useSelectState } from './useSelectState'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { getArtists } from '../services/artists'
import {
  addAlbumToAlbumCollection,
  addArtistToCollection
} from '../libs/Firebase/firestore'

export const useFetchSongData = (mainSerctionRef) => {
  const location = useLocation()
  const [isFetching, setIsFecthing] = useState(true)
  const { setBackdropColor, scroll, setScroll } = useSelectState()
  const { addArtistToList, songSelect, artists, albums } =
    useSelectArtistState()

  useEffect(() => {
    const updateScroll = (e) => {
      setScroll(e.target.scrollTop)
    }

    mainSerctionRef.current.addEventListener('scroll', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [scroll, mainSerctionRef, setScroll])

  useEffect(() => {
    mainSerctionRef.current.scrollTop = 0
  }, [location.pathname])

  useEffect(() => {
    setIsFecthing(true)

    const artistsIds = [
      '4q3ewBCX7sLwd24euuV69X',
      '5he5w2lnU9x7JFhnwcekXX',
      '1vyhD5VmyZ7KMfW5gqLgo5',
      '790FomKkXshlbRYZFtlgla',
      '1SupJlEpv7RS2tPNRaHViT',
      '6eUKZXaKkcviH0Ku9w2n3V',
      '5XJDexmWFLWOkjOEjOVX3e',
      '1i8SpTcr7yvPOmcqrbnVXY',
      '0tmwSHipWxN12fsoLcFU3B',
      '2LRoIwlKmHjgvigdNGBHNo'
    ]

    if (artists.length === 0) {
      artistsIds.map(async (artId) => {
        const artDataRequest = await getArtists(artId)
        addArtistToCollection({ artist: artDataRequest })
      })
    }

    if (artists.length === 0) {
      getArtists().then((res) => addArtistToList(res))
    }

    const abumsIds = [
      '37i9dQZF1E37Y7hxDgx6NS',
      '37i9dQZEVXbtDWpVNERfBl',
      '37i9dQZF1E37PKR4VTKNmN',
      '37i9dQZF1E3abmQbZ2HWZk',
      '37i9dQZF1E38uUgA81Fx3I',
      '37i9dQZF1E36IF8GMimpJR'
    ]

    ;(async function () {
      if (albums.length === 0) {
        abumsIds.map(async (abm) => {
          try {
            const res = await getAlbumsRecommended(abm)
            addAlbumToAlbumCollection({ album: res })

            return res
          } catch (error) {
            console.error(error)
          } finally {
            setIsFecthing(false)
          }
        })
      }
    })()

    document.scrollTop = 0
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      setBackdropColor(songSelect.song?.color)
    }
  }, [location.pathname])

  return { isFetching }
}
