import { storeConfig, useDataArtists } from '../Store/storeConfig'

export const useSelectState = () => {
  const currentTime = storeConfig((state) => state.currentTime)
  const setCurrentTime = storeConfig((state) => state.setCurrentTime)

  const setAudioState = storeConfig((state) => state.setAudioState)
  const audioState = storeConfig((state) => state.volume)

  const setBackdropColor = storeConfig((state) => state.setBackdropColor)
  const backdropColor = storeConfig((state) => state.backdropColor)

  const newSongHearRecent = storeConfig((state) => state.newSongHearRecent)
  const recentHeardSongs = storeConfig((state) => state.recentHeardSongs)

  const setViewModals = storeConfig((state) => state.setViewModals)
  const viewModals = storeConfig((state) => state.viewModals)

  const scroll = storeConfig((state) => state.scroll)
  const setScroll = storeConfig((state) => state.setScroll)

  const favList = storeConfig((state) => state.favList)
  const setFavList = storeConfig((state) => state.setFavList)

  const duration = storeConfig((state) => state.duration)
  const setDuration = storeConfig((state) => state.setDuration)
  const setSongState = storeConfig((state) => state.setSongState)
  const songState = storeConfig((state) => state.songState)
  const addSongToList = storeConfig((state) => state.addSongToList)

  const hearSongsList = storeConfig((state) => state.hearSongsList)
  const hearSongRecent = storeConfig((state) => state.hearSongRecent)

  const deployNavbar = storeConfig((state) => state.deployNavbar)
  const setDeployNavbar = storeConfig((state) => state.setDeployNavbar)

  return {
    newSongHearRecent,
    deployNavbar,
    recentHeardSongs,
    hearSongRecent,
    setDeployNavbar,
    viewModals,
    setViewModals,
    setAudioState,
    audioState,
    setFavList,
    favList,
    hearSongsList,
    setBackdropColor,
    backdropColor,
    scroll,
    setScroll,
    addSongToList,
    currentTime,
    setCurrentTime,
    setSongState,
    duration,
    setDuration,
    songState
  }
}

export const useSelectArtistState = () => {
  const songSelect = useDataArtists((state) => state?.songSelect)
  const artistId = useDataArtists((state) => state?.artistId)

  const userLibrary = useDataArtists((state) => state.userLibrary)
  const addToLibrary = useDataArtists((state) => state.addToLibrary)

  const addNewPlaylistCreated = useDataArtists(
    (state) => state.addNewPlaylistCreated
  )
  const userPlaylistCreated = useDataArtists(
    (state) => state.userPlaylistCreated
  )
  const addSongToListCreated = useDataArtists(
    (state) => state.addSongToListCreated
  )

  const updatePlaylistCreated = useDataArtists(
    (state) => state.updatePlaylistCreated
  )

  const playPauseBar = useDataArtists((state) => state?.playPauseBar)

  const likeSongsList = useDataArtists((state) => state.likeSongsList)
  const addLikeSong = useDataArtists((state) => state.addLikeSong)

  const artists = useDataArtists((state) => state?.artists)

  const addArtistToList = useDataArtists((state) => state?.addArtistToList)

  const albums = useDataArtists((state) => state?.albums)
  const addAlbum = useDataArtists((state) => state?.addAlbum)

  const genres = useDataArtists((state) => state?.genres)
  const addGenre = useDataArtists((state) => state?.addGenre)

  return {
    userLibrary,
    addToLibrary,
    updatePlaylistCreated,
    addSongToListCreated,
    userPlaylistCreated,
    addNewPlaylistCreated,
    playPauseBar,
    likeSongsList,
    addLikeSong,
    artists,
    addArtistToList,
    albums,
    addAlbum,
    songSelect,
    artistId,
    genres,
    addGenre
  }
}
