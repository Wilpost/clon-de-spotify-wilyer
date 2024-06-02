import { useState } from 'react'
import { useSelectArtistState } from './useSelectState'
import {
  getAllAlbumsRecommended,
  getAllArtistsData
} from '../libs/Firebase/firestore'

export function useAppHooks() {
  const [loading, setLoading] = useState(false)
  const { addAlbum, addArtistToList } = useSelectArtistState()

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

  return { fetchDataRequest, loading }
}
