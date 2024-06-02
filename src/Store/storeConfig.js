import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDataArtists = create(
  persist(
    (set) => ({
      artistId: '',
      artists: [], // <-- Lista de los artistas
      albums: [], // <--- Lista de los albumes creados por mi que serviran como recomendaciones para el usuario
      genres: [], // <-- Lista de generos musicales
      likeSongsList: {
        items: [],
        hear: false
      },
      songSelect: {
        song: {},
        beat: '',
        list: [],
        albumId: null,
        type_album: '',
        color: ''
      },

      addLikeSong: (songData) => {
        songData.hear = false
        set((state) => {
          const isAlredyDefinedSong = state.likeSongsList.items.find(
            (track) => track.id === songData.id
          )

          if (isAlredyDefinedSong) {
            const indexFound = state.likeSongsList.items.findIndex(
              (track) => track.id === songData.id
            )
            state.likeSongsList.items.splice(indexFound, 1)

            return {
              likeSongsList: {
                hear: state.likeSongsList.hear,
                items: state.likeSongsList.items
              }
            }
          }

          state.likeSongsList.items.push(songData)

          return {
            likeSongsList: {
              hear: state.likeSongsList.hear,
              items: state.likeSongsList.items
            }
          }
        })
      },

      addArtistToList: (artData) => {
        set(() => {
          // const isAlredyExistAlbum = state.artists?.some(
          //   (item, i) => item.id === artist[i].id
          // )

          // if (isAlredyExistAlbum) {
          //   return { artists: state.artists }
          // }

          // const newData = artist.map((item) => {
          //   item.hear = false
          //   item.topTracks = topTracks
          //   return item
          // })

          return { artists: artData }
        })
      },
      addAlbum: (data = []) => {
        set(() => {
          // const isAlredyExistAlbum = state.albums.some(
          //   (item) => item?.id === data?.id
          // )

          // if (isAlredyExistAlbum) {
          //   return { albums: state.albums }
          // }

          // const dataModified = data?.tracks?.items.map((item) => {
          //   item.track.hear = false
          //   return item.track
          // })

          // if (data?.tracks?.items) {
          //   data.tracks.items = dataModified
          //   data.hear = false
          // }

          // state.albums.push(data)

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

              album.hear = false
              return album
            })

            console.log(newData.song)
            return {
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

              artt.hear = false
              return artt
            })

            return {
              artists: newDataArtists,
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
            const newDataLikedsSongs = state.likeSongsList?.items.map(
              (track) => {
                if (track.id === idSong) {
                  track.hear = value
                  newData.song = track
                  newData.beat = track?.preview_url
                  return track
                }

                track.hear = false
                return track
              }
            )

            newData.list = newDataLikedsSongs

            return {
              likeSongsList: { hear: value, items: newDataLikedsSongs },
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
      volume: 0,
      recentHeardSongs: [],
      currentTime: null,
      userPlaylist: [],
      backdropColor: '#65677e',
      duration: '0.0',
      viewModals: {
        createPlaylist: false,
        addSongToList: false,
        notification: false
      },
      scroll: 0,
      deployNavbar: false,
      currentSection: null,
      songState: false,
      favList: [],
      userPlaylistCreated: [],
      userLibrary: [],

      addToLibrary: (data) => {
        set((state) => {
          console.log('update ', data)

          const artistsExistInList = state.userLibrary.some(
            (item) => item.id === data.id
          )

          if (artistsExistInList) {
            const idx = state.userLibrary.findIndex((art) => art.id === data.id)
            state.userLibrary.splice(idx, 1)

            return { userLibrary: state.userLibrary }
          }

          state.userLibrary.push(data)

          return { userLibrary: state.userLibrary }
        })
      },
      hearSongRecent: (id, value) => {
        set((state) => {
          const modifiedData = state.recentHeardSongs.map((item) => {
            if (item.albumId === id) {
              item.hear = value
              item.data.hear = value
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
          const stateData = state.recentHeardSongs.some((item) => {
            return item.albumId === albumId
          })

          if (stateData) {
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
              hear: false
            })

            return { recentHeardSongs: state.recentHeardSongs }
          }

          const data = albums.find((album) => album.id === albumId)

          state.recentHeardSongs.push({
            data,
            albumId,
            type: data?.type === 'playlist' ? 'album' : 'artist'
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
      updatePlaylistCreated: (id, data) => {
        set((state) => {
          const indexPlaylist = state.userPlaylistCreated.findIndex(
            (item) => item.id === id
          )

          const playlistUpdate = {
            id,
            ...data,
            songs: state.userLibrary[indexPlaylist].songs,
            type: 'userPlaylist'
          }

          state.userPlaylistCreated.splice(indexPlaylist, 1, playlistUpdate)
          state.userLibrary.splice(indexPlaylist, 1, playlistUpdate)

          return {
            userPlaylistCreated: state.userPlaylistCreated,
            userLibrary: state.userLibrary
          }
        })
      },
      addNewPlaylistCreated: () => {
        set((state) => {
          const created = {
            id: crypto.randomUUID(),
            title: `Mi lista n.º${state.userPlaylistCreated.length + 1}`,
            type: 'userPlaylist',
            image: null,
            songs: []
          }

          const newPlaylist = [...state.userPlaylistCreated, created]
          state.userLibrary.push(created)

          return {
            userPlaylistCreated: newPlaylist,
            userLibrary: state.userLibrary
          }
        })
      },
      addSongToListCreated: (newUserPlaylistCreated) => {
        // set((state) => {
        //   const playlistFound = state.userPlaylistCreated.filter(
        //     (s) => s.id === id
        //   )

        //   const isAredySongDefined = playlistFound.songs.find(
        //     (pl) => pl.id === song.id
        //   )

        //   if (isAredySongDefined) {
        //     const indexFound = playlistFound.songs.findIndex(
        //       (track) => track.id === song.id
        //     )

        //     const playlistUpdated = state.userPlaylistCreated.map((pl) => {
        //       if (pl.id === id) {
        //         pl.songs.splice(indexFound, 1)
        //         return pl
        //       }

        //       return pl
        //     })

        //     return { userPlaylistCreated: playlistUpdated }
        //   }

        //   const playlistUpdated = state.userPlaylistCreated.map((pl) => {
        //     if (pl.id === id) {
        //       pl.songs.push(song)
        //       return pl
        //     }

        //     return pl
        //   })

        //   console.log('playlistUpdated ===>  ', playlistUpdated)

        //   return { userPlaylistCreated: playlistUpdated }
        // })

        set((state) => {
          const userFollows = state.userLibrary.filter(
            (item) => item.type === 'artist'
          )

          const playlistsCreateds = newUserPlaylistCreated.map((pl) => {
            if (pl.songs.length === 0) {
              pl.image = null
              return pl
            } else {
              return pl
            }
          })

          const newDataLibrary = [...userFollows, ...playlistsCreateds]

          return {
            userPlaylistCreated: newUserPlaylistCreated,
            userLibrary: newDataLibrary
          }
        })
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
            ([key]) => !['songState', 'viewModals'].includes(key)
          )
        )
    }
  )
)

export const albumsState = create(
  persist(
    (set) => ({
      albumItemList: [],
      addItemToList: (item) => {
        set(() => {
          const newData = item.map((item) => {
            item.hear = false
            return item
          })

          return { albumItemList: newData }
        })
      }
    }),
    {
      name: 'albums_state'
      // partialize: (state) =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(
      //       ([key]) => !['songState', 'viewModals'].includes(key)
      //     )
      //   )
    }
  )
)
