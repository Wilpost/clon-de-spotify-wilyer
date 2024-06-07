import axios from 'axios'
import { URL_API, getToken } from '../scripts/script'
import artistData from '../../public/data_artists_dcnl.json'
import { getAllArtistsData } from '../libs/Firebase/firestore'
import { fetchImageColor } from '../libs/get_image_color'
const token = window.localStorage.getItem('access_Token')

export const getArtists = async (id) => {
  const requestFireStoreData = await getAllArtistsData()

  if (requestFireStoreData.length === 0) {
    const { data } = await axios
      .get(`${URL_API}/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res)
      .catch(async (err) => {
        if (err.request.status === 401) {
          const acces = await getToken()

          const response = await axios.get(`${URL_API}/artists/${id}`, {
            headers: {
              Authorization: `Bearer ${acces}`
            }
          })

          return response.data
        }
      })

    const artistFound = artistData.find(
      (art) => art.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
    )

    data.backdrop_image = artistFound.backdrop_image
    data.primary_color = await fetchImageColor(artistFound.backdrop_image)

    const trackList = await getArtistTopTracks(data.id)
    data.trackList = trackList

    return data
  }
}

export const getArtistTopTracks = async (artId) => {
  const requestFireStoreData = await getAllArtistsData()

  if (requestFireStoreData.length === 0) {
    let res
    res = await axios
      .get(`${URL_API}/artists/${artId}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(async (error) => {
        if (error.request.status === 401) {
          const access = await getToken()
          res = await axios.get(`${URL_API}/artists/${artId}/top-tracks`, {
            headers: {
              Authorization: `Bearer ${access}`
            }
          })
        }
      })

    const artistTopTracksModified = res.data.tracks.map((track) => {
      track.hear = false
      return track
    })

    return artistTopTracksModified
  }
}
