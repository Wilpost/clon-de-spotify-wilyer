import axios from 'axios'
import { URL_API, getToken } from '../scripts/script'
import artistData from '../../public/data_artists_dcnl.json'
import { getAllArtistsData } from '../libs/Firebase/firestore'
const token = window.localStorage.getItem('access_Token')

export const getArtists = async (id) => {
  const { data: art } = await axios
    .get(`${URL_API}/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const acces = await getToken()

        const { data: art } = await axios.get(`${URL_API}/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${acces}`
          }
        })

        return art
      }
    })

  const artistFound = artistData.find(
    (data) => data.name.toLocaleLowerCase() === art.name.toLocaleLowerCase()
  )

  art.backdrop_image = artistFound.backdrop_image

  const trackList = await getArtistTopTracks(art.id)
  art.trackList = trackList

  return art

  // const artistsList = art.map((artist) => {

  //   return {
  //     ...artist,
  //   }
  // })

  // const artAll = await Promise.all(
  //   artistsList.map(async (art) => {
  //     art.trackList = trackList
  //     return art
  //   })
  // )
}

export const getArtistTopTracks = async (artId) => {
  const requestFireStoreData = await getAllArtistsData()

  try {
    if (requestFireStoreData.length === 0) {
      const res = await axios.get(`${URL_API}/artists/${artId}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const artistTopTracksModified = res.data.tracks.map((track) => {
        track.hear = false
        return track
      })

      return artistTopTracksModified
    }
  } catch (error) {
    if (error.request.status === 401) {
      getToken()
    }

    console.error(error)
  }
}
