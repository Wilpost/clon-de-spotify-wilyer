import { useCallback, useState } from 'react'
import { useSelectArtistState } from './useSelectState'
import {
  getAllAlbumsRecommended,
  getAllArtistsData
} from '../libs/Firebase/firestore'

export function useAppHooks() {
  const [loading, setLoading] = useState(false)
  const { addAlbum, addArtistToList } = useSelectArtistState()

  const fetchFunctionRequest = async () => {
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

  const fetchDataRequest = useCallback(() => {
    fetchFunctionRequest()
  }, [loading])

  return { fetchDataRequest, loading }
}
