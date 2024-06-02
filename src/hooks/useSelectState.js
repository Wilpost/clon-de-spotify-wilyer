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

  const addSongToListCreated = storeConfig(
    (state) => state.addSongToListCreated
  )

  const updatePlaylistCreated = storeConfig(
    (state) => state.updatePlaylistCreated
  )

  const setViewModals = storeConfig((state) => state.setViewModals)
  const viewModals = storeConfig((state) => state.viewModals)

  const scroll = storeConfig((state) => state.scroll)
  const setScroll = storeConfig((state) => state.setScroll)

  const userLibrary = storeConfig((state) => state.userLibrary)
  const addToLibrary = storeConfig((state) => state.addToLibrary)

  const addNewPlaylistCreated = storeConfig(
    (state) => state.addNewPlaylistCreated
  )
  const userPlaylistCreated = storeConfig((state) => state.userPlaylistCreated)

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
    userLibrary,
    addToLibrary,
    addSongToListCreated,
    newSongHearRecent,
    deployNavbar,
    recentHeardSongs,
    hearSongRecent,
    setDeployNavbar,
    updatePlaylistCreated,
    viewModals,
    setViewModals,
    addNewPlaylistCreated,
    userPlaylistCreated,
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
