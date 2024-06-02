import axios from 'axios'
import { URL_API, getToken } from '../scripts/script'
import { fetchImageColor } from '../libs/get_image_color'
import { getAllAlbumsRecommended } from '../libs/Firebase/firestore'
const token = window.localStorage.getItem('access_Token')
// const artistData = window.localStorage.getItem('artists_data')
// const data = JSON.parse(artistData)

export const getAlbumsRecommended = async (id) => {
  const requestFireStoreData = await getAllAlbumsRecommended()

  if (requestFireStoreData.length === 0) {
    const { data } = await axios
      .get(`${URL_API}/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res)
      .catch((err) => {
        if (err.request.status === 401) {
          return getToken().then(async (acces) => {
            const playlists = await axios.get(`${URL_API}/playlists/${id}`, {
              headers: {
                Authorization: `Bearer ${acces}`
              }
            })

            return playlists
          })
        }
      })

    const color = await fetchImageColor(data.images[0].url)

    data.primary_color = color

    return data
  }
}
