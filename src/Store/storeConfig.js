import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDataArtists = create(
  persist(
    (set) => ({
      artistId: '',
      artists: [], // <-- Lista de los artistas
      albums: [], // <--- Lista de los albumes creados por mi que serviran como recomendaciones para el usuario
      genres: [], // <-- Lista de generos musicales
      songSelect: {
        song: {},
        beat: '',
        list: [],
        albumId: null,
        type_album: '',
        color: ''
      },
      userLibrary: {
        likeSongsList: {
          items: [],
          hear: false,
          primary_color: '#6039ee',
          title: 'Tus me gusta'
        },
        userPlaylistCreated: [],
        userFollows: [],
        albumsLike: []
      },

      addToLibrary: (data, type) => {
        set((state) => {
          if (type === 'artist') {
            const artistsExistInList = state.userLibrary.userFollows.some(
              (item) => item.id === data.id
            )

            if (artistsExistInList) {
              const idx = state.userLibrary.userFollows.findIndex(
                (art) => art.id === data.id
              )
              state.userLibrary.userFollows.splice(idx, 1)

              return {
                userLibrary: {
                  userFollows: state.userLibrary.userFollows,
                  ...state.userLibrary
                }
              }
            }

            state.userLibrary.userFollows.push({ ...data, hear: false })

            return {
              userLibrary: {
                userFollows: state.userLibrary.userFollows,
                ...state.userLibrary
              }
            }
          }

          const artistsExistInList = state.userLibrary.albumsLike.some(
            (item) => item.id === data.id
          )

          if (artistsExistInList) {
            const idx = state.userLibrary.albumsLike.findIndex(
              (art) => art.id === data.id
            )
            state.userLibrary.albumsLike.splice(idx, 1)

            return {
              userLibrary: {
                albumsLike: state.userLibrary.albumsLike,
                ...state.userLibrary
              }
            }
          }

          state.userLibrary.albumsLike.push({ ...data, hear: false })

          return {
            userLibrary: {
              albumsLike: state.userLibrary.albumsLike,
              ...state.userLibrary
            }
          }
        })
      },
      addLikeSong: (songData) => {
        set((state) => {
          const isAlredyDefinedSong =
            state.userLibrary.likeSongsList.items.find(
              (track) => track.id === songData.id
            )

          songData.type = 'myPlaylist'
          songData.hear = false

          if (isAlredyDefinedSong) {
            let itemsBefore = state.userLibrary.likeSongsList.items

            const indexFound = state.userLibrary.likeSongsList.items.findIndex(
              (track) => track.id === songData.id
            )

            itemsBefore.splice(indexFound, 1)

            const likeObj = {
              hear: state.userLibrary.likeSongsList.hear,
              items: itemsBefore,
              id: 'likedPlaylist',
              type: 'myPlaylist'
            }

            return {
              userLibrary: {
                ...state.userLibrary,
                likeSongsList: likeObj
              }
            }
          }

          const likeObj = {
            hear: state.userLibrary.likeSongsList.hear,
            items: [...state.userLibrary.likeSongsList.items, songData],
            id: 'likedPlaylist',
            type: 'myPlaylist',
            title: 'Tus me gusta'
          }

          return {
            userLibrary: { ...state.userLibrary, likeSongsList: likeObj }
          }
        })
      },
      updatePlaylistCreated: (id, data) => {
        set((state) => {
          const indexPlaylist = state.userLibrary.userPlaylistCreated.findIndex(
            (item) => item.id === id
          )

          const beforePlaylist = state.userLibrary.userPlaylistCreated

          const playlistUpdate = {
            id,
            ...data,
            songs: state.userLibrary.userPlaylistCreated[indexPlaylist].songs,
            type: 'userPlaylist'
          }

          beforePlaylist.splice(indexPlaylist, 1, playlistUpdate)

          return {
            userLibrary: {
              ...state.userLibrary,
              userPlaylistCreated: beforePlaylist
            }
          }
        })
      },
      addNewPlaylistCreated: () => {
        set((state) => {
          const created = {
            id: crypto.randomUUID(),
            title: `Mi lista n.º${
              state.userLibrary.userPlaylistCreated.length + 1
            }`,
            type: 'userPlaylist',
            image: null,
            songs: [],
            hear: false
          }

          const newPlaylist = [
            ...state.userLibrary.userPlaylistCreated,
            created
          ]

          return {
            userLibrary: {
              ...state.userLibrary,
              userPlaylistCreated: newPlaylist
            }
          }
        })
      },
      addSongToListCreated: (newUserPlaylistCreated) => {
        set((state) => {
          const playlistsCreateds = newUserPlaylistCreated.map((pl) => {
            if (pl.songs.length === 0) {
              pl.image = null
              return pl
            } else {
              return pl
            }
          })

          return {
            userLibrary: {
              ...state.userLibrary,
              userPlaylistCreated: playlistsCreateds
            }
          }
        })
      },

      addArtistToList: (artData) => {
        set(() => {
          return { artists: artData }
        })
      },
      addAlbum: (data = []) => {
        set(() => {
          return { albums: data }
        })
      },
      playPauseBar: (listId, idSong, type, value) => {
        set((state) => {
          const newData = {
            list: [],
            song: {},
            beat: '',
            color: ''
          }

          if (type === 'album') {
            const {
              userPlaylistCreated,
              likeSongsList,
              albumsLike,
              userFollows
            } = state.userLibrary

            const albumsModified = state.albums.map((album) => {
              // Modifico el album encontrado y lo devuelvo
              if (album?.id === listId) {
                const newItemModified = album.tracks.items.map((track) => {
                  if (track.id === idSong) {
                    track.hear = value
                    newData.song = track
                    newData.beat = track.preview_url

                    return track
                  }

                  track.hear = false
                  return track
                })

                album.hear = value
                album.tracks.items = newItemModified
                newData.list = newItemModified
                newData.color = album.primary_color
                return album
              }

              album.tracks.items.map((track) => {
                track.hear = false
                return track
              })

              album.hear = false
              return album
            })

            const existInLibrary = albumsLike.find((lib) => lib.id === listId)

            const modifiedLikeList = likeSongsList.items.map((lk) => {
              lk.hear = false
              return lk
            })
            state.userLibrary.likeSongsList.hear = false

            const followsModified = userFollows.map((lib) => {
              const newTrackList = lib.trackList.map((tr) => {
                tr.hear = false
                return tr
              })

              lib.trackList = newTrackList
              lib.hear = false
              return lib
            })

            const newDataLibrary = userPlaylistCreated.map((lib) => {
              const newSongs = lib.songs.map((sn) => {
                sn.hear = false
                return sn
              })

              lib.songs = newSongs
              lib.hear = false
              return lib
            })

            if (existInLibrary) {
              const albumsLikeModified = albumsLike.map((lib) => {
                if (lib.id === listId) {
                  const newItemModified = lib.tracks.items.map((track) => {
                    if (track.id === idSong) {
                      track.hear = value
                      return track
                    }

                    track.hear = false
                    return track
                  })

                  lib.tracks.items = newItemModified
                  lib.hear = value
                  return lib
                }

                const newItemModified = lib.tracks.items.map((track) => {
                  track.hear = false
                  return track
                })

                lib.tracks.items = newItemModified
                lib.hear = false
                return lib
              })

              return {
                userLibrary: {
                  ...state.userLibrary,
                  userFollows: followsModified,
                  albumsLike: albumsLikeModified,
                  userPlaylistCreated: newDataLibrary,
                  likeSongsList: {
                    items: modifiedLikeList,
                    ...state.userLibrary.likeSongsList
                  }
                },
                albums: albumsModified,
                songSelect: {
                  type_album: type,
                  song: newData.song,
                  beat: newData.beat,
                  list: newData.list,
                  albumId: listId
                }
              }
            }

            return {
              userLibrary: {
                ...state.userLibrary,
                userFollows: followsModified,
                userPlaylistCreated: newDataLibrary,
                likeSongsList: {
                  items: modifiedLikeList,
                  hear: false,
                  ...state.userLibrary.likeSongsList
                }
              },
              albums: albumsModified,
              songSelect: {
                type_album: type,
                song: newData.song,
                beat: newData.beat,
                list: newData.list,
                albumId: listId,
                color: newData.color
              }
            }
          }

          if (type === 'artist') {
            const {
              userPlaylistCreated,
              likeSongsList,
              albumsLike,
              userFollows
            } = state.userLibrary

            const existInLibrary = userFollows.some((lib) => lib.id === listId)

            // Like albums list
            const newDataAlbumsLike = albumsLike.map((albm) => {
              const newSongs = albm.tracks.items.map((sn) => {
                sn.hear = false
                return sn
              })

              albm.tracks.items = newSongs
              albm.hear = false
              return albm
            })

            // albums
            const newDataAlbums = state.albums.map((albm) => {
              const newSongs = albm.tracks.items.map((sn) => {
                sn.hear = false
                return sn
              })

              albm.tracks.items = newSongs
              albm.hear = false
              return albm
            })

            //Like list
            const modifiedLikeList = likeSongsList.items.map((lk) => {
              lk.hear = false
              return lk
            })
            likeSongsList.hear = false

            // User playlist created list
            const newDataLibrary = userPlaylistCreated.map((lib) => {
              const newSongs = lib.songs.map((sn) => {
                sn.hear = false
                return sn
              })

              lib.songs = newSongs
              lib.hear = false
              return lib
            })

            const newDataArtists = state.artists.map((artt) => {
              if (artt.id === listId) {
                artt.hear = value
                newData.list = artt.trackList

                artt.trackList = artt.trackList.map((track) => {
                  if (track.id === idSong) {
                    track.hear = value
                    newData.song = track
                    newData.beat = track?.preview_url
                    return track
                  }

                  track.hear = false
                  return track
                })

                return artt
              }

              artt.trackList = artt.trackList.map((track) => {
                track.hear = false
                return track
              })

              artt.hear = false
              return artt
            })

            if (existInLibrary) {
              const followsModified = userFollows.map((lib) => {
                if (lib.id === listId) {
                  lib.hear = value
                  return lib
                }

                lib.hear = false
                return lib
              })

              return {
                artists: newDataArtists,
                albums: newDataAlbums,
                userLibrary: {
                  ...state.userLibrary,
                  userFollows: followsModified,
                  albumsLike: newDataAlbumsLike,
                  userPlaylistCreated: newDataLibrary,
                  likeSongsList: {
                    items: modifiedLikeList,
                    ...state.userLibrary.likeSongsList
                  }
                },
                songSelect: {
                  type_album: type,
                  song: newData.song,
                  beat: newData.beat,
                  list: newData.list,
                  albumId: listId
                }
              }
            }

            return {
              artists: newDataArtists,
              albums: newDataAlbums,
              userLibrary: {
                ...state.userLibrary,
                albumsLike: newDataAlbumsLike,
                userPlaylistCreated: newDataLibrary,
                likeSongsList: {
                  items: modifiedLikeList,
                  ...state.userLibrary.likeSongsList
                }
              },
              songSelect: {
                type_album: type,
                song: newData.song,
                beat: newData.beat,
                list: newData.list,
                albumId: listId
              }
            }
          }

          if (type === 'myPlaylist') {
            const newDataLibrary = state.userLibrary.userPlaylistCreated.map(
              (lib) => {
                const newSongs = lib.songs.map((sn) => {
                  sn.hear = false
                  return sn
                })

                lib.songs = newSongs
                lib.hear = false
                return lib
              }
            )

            state.userLibrary.userPlaylistCreated = newDataLibrary

            const newDataAlbumsLike = state.userLibrary.albumsLike.map(
              (albm) => {
                const newSongs = albm.tracks.items.map((sn) => {
                  sn.hear = false
                  return sn
                })

                albm.tracks.items = newSongs
                albm.hear = false
                return albm
              }
            )

            const followsModified = state.userLibrary.userFollows.map((lib) => {
              const newTrackList = lib.trackList.map((tr) => {
                tr.hear = false
                return tr
              })

              lib.trackList = newTrackList
              lib.hear = false
              return lib
            })

            const newDataAlbums = state.albums.map((albm) => {
              const newSongs = albm.tracks.items.map((sn) => {
                sn.hear = false
                return sn
              })

              albm.tracks.items = newSongs
              albm.hear = false
              return albm
            })

            const newDataLikedsSongs =
              state.userLibrary.likeSongsList.items.map((track) => {
                if (track.id === idSong) {
                  track.hear = value
                  newData.song = track
                  newData.beat = track?.preview_url
                  return track
                }

                track.hear = false
                return track
              })

            newData.list = newDataLikedsSongs

            return {
              albums: newDataAlbums,
              userLibrary: {
                ...state.userLibrary,
                userFollows: followsModified,
                albumsLike: newDataAlbumsLike,
                userPlaylistCreated: newDataLibrary,
                likeSongsList: {
                  ...state.userLibrary.likeSongsList,
                  hear: value,
                  items: newDataLikedsSongs
                }
              },
              songSelect: {
                type_album: type,
                song: newData.song,
                beat: newData.beat,
                list: newData.list,
                albumId: listId
              }
            }
          }

          if (type === 'myPlaylistCreated') {
            const libraryModified = state.userLibrary.likeSongsList.items.map(
              (lib) => {
                lib.hear = false
                return lib
              }
            )
            state.userLibrary.likeSongsList.hear = false

            const newDataAlbums = state.albums.map((albm) => {
              const newSongs = albm.tracks.items.map((sn) => {
                sn.hear = false
                return sn
              })

              albm.tracks.items = newSongs
              albm.hear = false
              return albm
            })

            const followsModified = state.userLibrary.userFollows.map((lib) => {
              const newTrackList = lib.trackList.map((tr) => {
                tr.hear = false
                return tr
              })

              lib.trackList = newTrackList
              lib.hear = false
              return lib
            })

            const newDataAlbumsLike = state.userLibrary.albumsLike.map(
              (albm) => {
                const newSongs = albm.tracks.items.map((sn) => {
                  sn.hear = false
                  return sn
                })

                albm.tracks.items = newSongs
                albm.hear = false
                return albm
              }
            )

            const newDataLikedsSongs =
              state.userLibrary.userPlaylistCreated.map((playlist) => {
                if (playlist.id === listId) {
                  const newPlaylist = playlist.songs.map((track) => {
                    if (track.id === idSong) {
                      track.hear = value
                      newData.song = track
                      newData.beat = track?.preview_url
                      return track
                    }

                    track.hear = false
                    return track
                  })

                  newData.list = newPlaylist
                  playlist.hear = value
                  return playlist
                }

                playlist.songs.map((track) => {
                  track.hear = false
                  return track
                })

                playlist.hear = false
                return playlist
              })

            return {
              albums: newDataAlbums,
              userLibrary: {
                ...state.userLibrary,
                userFollows: followsModified,
                albumsLike: newDataAlbumsLike,
                userPlaylistCreated: newDataLikedsSongs,
                likeSongsList: {
                  ...state.userLibrary.likeSongsList,
                  items: libraryModified
                }
              },
              songSelect: {
                type_album: type,
                song: newData.song,
                beat: newData.beat,
                list: newData.list,
                albumId: listId
              }
            }
          }
        })
      }
    }),
    {
      name: 'artists_data'
      // partialize: (state) =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(([key]) => ![''].includes(key))
      //   )
    }
  )
)

export const storeConfig = create(
  persist(
    (set) => ({
      volume: 52,
      recentHeardSongs: [],
      currentTime: null,
      userPlaylist: [],
      backdropColor: '#65677e',
      duration: '0.0',
      viewModals: {
        createPlaylist: false,
        table: false,
        addSongToList: false,
        notification: false,
        song: null
      },
      scroll: 0,
      deployNavbar: false,
      currentSection: null,
      songState: false,
      favList: [],

      updateHearDataSongRecent: (id, data) => {
        set((state) => {
          const indexPlaylist = state.recentHeardSongs.findIndex(
            (item) => item.albumId === id
          )

          const trackFound = state.recentHeardSongs.find(
            (item) => item.albumId === id
          )

          const beforePlaylist = state.recentHeardSongs

          const playlistUpdate = {
            ...trackFound,
            ...data
          }

          beforePlaylist.splice(indexPlaylist, 1, playlistUpdate)

          return {
            recentHeardSongs: beforePlaylist
          }
        })
      },
      hearSongRecent: (id, value) => {
        set((state) => {
          const modifiedData = state.recentHeardSongs.map((item) => {
            if (item.albumId === id && item.albumId !== 'likedPlaylist') {
              item.hear = value
              if (item.data?.hear) {
                item.data.hear = value
              }
              return item
            }

            if (item.albumId === id && id === 'likedPlaylist') {
              item.hear = value

              return item
            }

            if (item.albumId !== id && item.albumId === 'likedPlaylist') {
              item.hear = false

              return item
            }

            item.hear = false
            item.data.hear = false

            return item
          })

          return { recentHeardSongs: modifiedData }
        })
      },
      newSongHearRecent: (albumId, albums) => {
        set((state) => {
          const isNewData = state.recentHeardSongs.find((item) => {
            return item.albumId === albumId
          })

          const data = albums.find((album) => album.id === albumId)

          if (isNewData) {
            const indexDataFound = state.recentHeardSongs.findIndex(
              (sn) => sn.albumId === albumId
            )

            const newData = {
              albumId,
              data:
                albumId === 'likedPlaylist'
                  ? {
                      name: 'Tus me gusta',
                      id: albumId
                    }
                  : data,
              type:
                (data?.type === 'playlist' && 'album') ||
                (data?.type === 'artist' && 'artist') ||
                (data?.type === 'userPlaylist' && 'userPlaylist') ||
                (albumId === 'likedPlaylist' && 'myPlaylist'),
              primary_color: '#6039ee'
            }

            state.recentHeardSongs.splice(indexDataFound, 1, newData)

            return { recentHeardSongs: state.recentHeardSongs }
          }

          if (albumId === 'likedPlaylist') {
            state.recentHeardSongs.push({
              albumId,
              data: {
                name: 'Tus me gusta',
                id: albumId
              },
              type: 'myPlaylist',
              hear: false,
              primary_color: '#6039ee'
            })

            return { recentHeardSongs: state.recentHeardSongs }
          }

          state.recentHeardSongs.push({
            data,
            albumId,
            type:
              (data?.type === 'playlist' && 'album') ||
              (data?.type === 'artist' && 'artist') ||
              (data?.type === 'userPlaylist' && 'userPlaylist')
          })

          return { recentHeardSongs: state.recentHeardSongs }
        })
      },
      setViewModals: (newData) => {
        set((state) => ({ viewModals: { ...state.viewModals, ...newData } }))
      },
      setDeployNavbar: (value) => {
        set({ deployNavbar: value })
      },
      addFavSong: (favSong) => {
        set((state) => ({
          favList: [...new Set([...state.likeSongsList, favSong])]
        }))
      },
      setAudioState: (value) => {
        set({ volume: value })
      },
      setSongState: (value) => {
        set({ songState: value })
      },
      setBackdropColor: (color) => {
        set({ backdropColor: color })
      },
      setScroll: (value) => set({ scroll: value }),
      setDuration: (value) => set({ duration: value }),
      setCurrentTime: (value) => set({ currentTime: value })
    }),
    {
      name: 'Song_state_data',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['songState', 'viewModals', 'scroll'].includes(key)
          )
        )
    }
  )
)
