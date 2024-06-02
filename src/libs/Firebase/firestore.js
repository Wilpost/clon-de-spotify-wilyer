import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore'
import { app } from './firebase_config'

export const db = getFirestore(app)

export async function addAlbumToAlbumCollection({ album = {} }) {
  const dataModified = album?.tracks?.items.map((item) => {
    item.track.hear = false
    return item.track
  })

  if (album?.tracks?.items) {
    album.tracks.items = dataModified
    album.hear = false
  }

  try {
    const asyncData = await setDoc(
      doc(db, 'user_albums_recommended', album.id),
      {
        album
      }
    )

    console.log('DocRef data in the App collection >>> ', asyncData)
  } catch (error) {
    console.error(error)
  }
}

export async function addArtistToCollection({ artist = {} }) {
  artist.hear = false

  try {
    await setDoc(doc(db, 'artists_data_collection', artist.id), {
      artist
    })
  } catch (error) {
    console.error(error)
  }
}

export async function getAllArtistsData() {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'artists_data_collection')
    )

    const artists = []

    querySnapshot.forEach((doc) => {
      // console.log('artists data ', doc.data())
      artists.push(doc.data().artist)
    })

    return artists
  } catch (error) {
    console.error(error)
  }
}

export async function getAlbumRecommended(albumId) {
  try {
    const docRef = doc(db, 'user_albums_recommended', albumId)
    const fetchDoc = await getDoc(docRef)

    if (fetchDoc.exists()) {
      return fetchDoc.data()
    } else {
      throw new Error('Album not found')
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getAllAlbumsRecommended() {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'user_albums_recommended')
    )

    const albums = []

    querySnapshot.forEach((doc) => {
      albums.push(doc.data().album)
    })

    return albums
  } catch (error) {
    console.error(error)
  }
}

export async function addDataToCollection({
  recentHeartSongs = [],
  userLibrary = [],
  userPlaylistsCreated = [],
  userLikeSongs = []
}) {
  try {
    const asyncData = await addDoc(collection(db, 'data_user_collection'), {
      recentHeartSongs,
      userLibrary,
      userPlaylistsCreated,
      userLikeSongs
    })

    console.log('DocRef data in the user collection >>> ', asyncData)
  } catch (error) {
    console.log(error)
  }
}
