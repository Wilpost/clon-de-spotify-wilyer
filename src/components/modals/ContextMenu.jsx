import { useRef, useState } from 'react'
import { IconAddedToMyPlaylist, SongIcon } from '../../icons/Icons'
import { Input } from '../inputs/Input'
import { useLikeSongsFunctions } from '../../hooks/useLikeSongsFunctions'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'

export const ContextMenuOptions = ({ song }) => {
  const [existCurrentShanges, setExistShanges] = useState(false)
  const { setViewModals } = useSelectState()

  const {
    addLikeSong,
    userLibrary,
    addSongToListCreated,
    addNewPlaylistCreated
  } = useSelectArtistState()

  const { userPlaylistCreated, likeSongsList } = userLibrary

  const [newStatePlaylist, setNewStatePlaylist] = useState(userPlaylistCreated)
  const { existSong } = useLikeSongsFunctions(likeSongsList.items, song)
  const opt = useRef(userPlaylistCreated)
  const newList = useRef([...userPlaylistCreated])
  const listPlaylist = useRef(null)
  const modalElement = useRef(null)

  const handleConfirmShanges = () => {
    addSongToListCreated(newStatePlaylist)
    setExistShanges(false)
    setViewModals({ notification: true })
  }

  const createNewPlaylist = () => {
    addNewPlaylistCreated()
    listPlaylist.current.scrollTop = listPlaylist.current.scrollHeight + 100
  }

  const searchInLibrary = (value) => {
    const plFound = newList.current.filter((pl) => {
      return pl.title.toLowerCase().includes(value.toLowerCase())
    })

    setNewStatePlaylist(plFound)
  }

  return (
    <article
      ref={modalElement}
      className='absolute h-80 overflow-hidden left-[276px] z-[99999] w-72 flex flex-col gap-2 items-center bg-groundDark bottom-[70px] rounded-[4px] p-3'
    >
      <form className='flex flex-col gap-2 w-full'>
        <label
          htmlFor='input_search'
          className='text-textGray font-semibold text-xs'
        >
          Añadir a la lista
        </label>
        <Input
          onChange={searchInLibrary}
          id='input_search'
          placeholder='Busca una lista'
        />

        <button
          onClick={() => createNewPlaylist()}
          type='button'
          className='w-full text-start px-3 rounded-md hover:bg-cardGround py-2'
        >
          <span className='text-textWhite font-normal text-md'>
            + Nueva lista
          </span>
        </button>
        <hr className='w-full opacity-10' />
      </form>

      <div
        ref={listPlaylist}
        className='options_list w-full h-[132px] flex flex-col overflow-y-auto text-sm font-semibold'
      >
        {/* Option Like playList */}
        <div className='hover:bg-cardGround rounded-[4px] p-[6px] cursor-pointer flex items-center gap-2'>
          <picture className='w-[47px] h-8 flex items-center'>
            <img
              className='rounded-sm'
              src='	https://misc.scdn.co/liked-songs/liked-songs-300.png'
              alt='Image playlist'
            />
          </picture>
          <div className='w-full font-medium'>Tus me gusta</div>
          {existSong && (
            <button onClick={() => addLikeSong(song)}>
              <IconAddedToMyPlaylist />
            </button>
          )}

          {!existSong && (
            <button
              onClick={() => addLikeSong(song)}
              className='w-[21px] h-[16px] rounded-full border-[1px] border-stone-400'
            />
          )}
        </div>

        {newStatePlaylist.length > 0 &&
          newStatePlaylist.map((option, index) => {
            let optionSaved = opt.current.find((item) => item.id === option.id)

            const shangeList = () => {
              const isAlredyDeclared = optionSaved.songs.some(
                (sn) => sn.id === song.id
              )

              if (isAlredyDeclared) {
                opt.current = opt.current.map((item) => {
                  if (item.id === option.id) {
                    return {
                      ...item,
                      songs: item.songs.filter((opt) => opt.id !== song.id)
                    }
                  }

                  return item
                })
              } else {
                opt.current = opt.current.map((item) => {
                  if (item.id === option.id) {
                    return {
                      ...item,
                      songs: [...item.songs, song]
                    }
                  }

                  return item
                })
              }

              const existShange = opt.current.find(
                (sn, i) =>
                  sn.songs.length !== userPlaylistCreated[i].songs.length
              )

              if (existShange) {
                setExistShanges(true)
              } else {
                setExistShanges(false)
              }

              setNewStatePlaylist(opt.current)
            }

            return (
              <>
                <div
                  key={index}
                  className='hover:bg-cardGround rounded-[4px] p-[6px] cursor-pointer flex items-center gap-2'
                >
                  {option.image !== null && (
                    <picture className='w-[48px] h-9 flex items-center rounded-sm bg-cardGroundSkeleton'>
                      <img
                        src={option.image}
                        className='object-cover h-full w-full'
                        alt='Image playlist'
                      />
                    </picture>
                  )}

                  {option.image === null && (
                    <picture className='w-[40px] h-9 pl-[7px] flex items-center rounded-sm bg-cardGroundSkeleton'>
                      <SongIcon w={20} h={20} />
                    </picture>
                  )}
                  <div className='w-full font-medium'>{option.title}</div>
                  {newStatePlaylist.find((i) => i?.id === option?.id) &&
                    !newStatePlaylist
                      .find((i) => i?.id === option?.id)
                      .songs?.some((item) => item.id === song.id) && (
                      <div
                        onClick={() => {
                          shangeList()
                        }}
                        className='w-[21px] h-[16px] rounded-full border-[1px] border-stone-400'
                      />
                    )}
                  {newStatePlaylist.find((i) => i?.id === option?.id) &&
                    newStatePlaylist
                      .find((i) => i?.id === option?.id)
                      .songs.some((item) => item.id === song.id) && (
                      <button
                        onClick={() => {
                          shangeList()
                        }}
                      >
                        <IconAddedToMyPlaylist />
                      </button>
                    )}
                </div>
              </>
            )
          })}

        {newStatePlaylist.length === 0 && (
          <span className='text-sm font-normal w-full text-center text-zinc-400'>
            Not found playlists
          </span>
        )}
      </div>

      <footer className='w-full shadow-top p-2 flex gap-2 items-center justify-end absolute bottom-0 bg-groundDark py-3 px-3'>
        <button
          className='font-bold opacity-70 hover:opacity-100 text-sm hover:scale-105 transition duration-75'
          onClick={() => setViewModals({ addSongToList: false })}
        >
          Cancelar
        </button>

        {existCurrentShanges && (
          <button
            className='text-sm bg-white rounded-2xl font-bold text-black p-[5px]'
            onClick={() => handleConfirmShanges()}
          >
            Hecho
          </button>
        )}
      </footer>
    </article>
  )
}
