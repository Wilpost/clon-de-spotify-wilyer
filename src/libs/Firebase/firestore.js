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
    await setDoc(doc(db, 'user_albums_recommended', album.id), {
      album
    })
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
  userLibrary = {
    likeSongsList: {
      items: [],
      hear: false
    },
    userPlaylistCreated: [],
    userFollows: [],
    albumsLike: []
  }
}) {
  try {
    await addDoc(collection(db, 'data_user_collection'), {
      recentHeartSongs,
      userLibrary
    })
  } catch (error) {
    console.error(error)
  }
}
