import { useEffect, useRef, useState } from 'react'
import { useLikeSongsFunctions } from '../../hooks/useLikeSongsFunctions'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import {
  CloseIcon,
  EditIcon,
  IconAddedToMyPlaylist,
  SongIcon
} from '../../icons/Icons'
import { Input } from '../inputs/Input'

export const CreatePlaylistModal = ({ id }) => {
  const { setViewModals } = useSelectState()
  const { userPlaylistCreated, updatePlaylistCreated } = useSelectArtistState()
  const {
    title,
    image,
    description: descriptionState
  } = userPlaylistCreated.find((playlist) => playlist.id === id)
  const [urlImage, setUrlImage] = useState(image)

  const [inputValue, setInputValue] = useState(title)
  const [descriptionValue, setDescriptionValue] = useState(descriptionState)
  const imagePlaylist = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)

    const formTitle = formData.get('title')
    const description = formData.get('description')

    setViewModals({ createPlaylist: false, notification: true })

    updatePlaylistCreated(id, {
      title: formTitle,
      description,
      image: urlImage
    })
  }

  const changePhoto = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      setUrlImage(event.target.result)
      imagePlaylist.current.src = event.target.result
    }

    reader.readAsDataURL(file)
  }

  const dialogRef = useRef(null)

  const handleClick = () => {
    setViewModals({ createPlaylist: false })
  }

  return (
    <dialog
      ref={dialogRef}
      className='z-[99999] animate-fadeIn top-0 grid place-content-center bg-opacity-60 fixed bg-arrowGround w-full h-full'
    >
      <figure
        onClick={handleClick}
        className='peer hover:bg-tempBarColor animate-fadeOut absolute top-[169px] z-[77777] left-[890px] cursor-pointer rounded-full p-2 hover:bg-opacity-40 transition'
      >
        <CloseIcon />
      </figure>

      <div className='w-[500px] peer-active:animate-FadeReverse animate-fadeOut h-96 rounded-lg p-5 py-6 bg-groundDark text-textComun'>
        <div className='w-full h-full justify-center flex flex-col gap-2'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='font-extrabold text-[22px]'>Editar datos</h1>
          </div>

          <div className='flex w-full h-full items-center gap-3 justify-between'>
            <div className='group h-full mb-6 w-[40%] flex items-center justify-center'>
              <figure className='relative overflow-hidden w-[200px] h-[180px] bg-secondaryDark rounded-md flex items-center justify-center shadow-4xl'>
                {!image && !imagePlaylist.current?.src && !urlImage && (
                  <div className='group-hover:hidden block opacity-60'>
                    <SongIcon w={60} h={60} />
                  </div>
                )}

                {urlImage && (
                  <img
                    ref={imagePlaylist}
                    src={urlImage}
                    className={`object-contain w-full h-full`}
                    alt='Playlist photo'
                  />
                )}

                <input
                  onChange={(e) => changePhoto(e)}
                  className='hidden'
                  type='file'
                  name='photo'
                  id='photo'
                  accept='image/*'
                />

                <label
                  htmlFor='photo'
                  className='group-hover:flex absolute z-[8888] bg-groundColor w-full h-full bg-opacity-80 hidden flex-col gap-1 items-center justify-center'
                >
                  <button className='absolute top-2 right-2 bg-groundColor bg-opacity-60 rounded-full w-9 h-9 font-bold flex items-center justify-center'>
                    <span className='text-textGray mb-2 text-md'>. . .</span>
                  </button>
                  <EditIcon w={60} h={60} />
                  <span className='font-normal'>Elegir foto</span>
                </label>
              </figure>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className='flex relative top-4 w-full h-full flex-col gap-4 items-start'
            >
              <label htmlFor='name' className='w-full flex flex-col gap-2'>
                <Input
                  id='name'
                  name='title'
                  type='text'
                  value={inputValue}
                  onChange={setInputValue}
                />
                <span className='peer-focus-visible:opacity-100 transition opacity-0 font-bold text-xs absolute top-[-7px] left-[10px]'>
                  Nombre
                </span>
              </label>

              <label
                htmlFor='decription'
                className='w-full h-full flex flex-col gap-2'
              >
                <textarea
                  name='description'
                  placeholder='Agregar una descripción opcional'
                  className=' peer border-1
                border-tempBarColor
              focus:border-bgCardRecent
              placeholder:text-textGray
              placeholder:text-opacity-50
              focus:bg-opacity-50
              transition w-full h-[122px] resize-none bg-tempBarColor bg-opacity-75 rounded-[4px] outline-none p-2 text-sm font-normal '
                  id='decription'
                  cols='30'
                  rows='10'
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />

                <h1 className='peer-focus-visible:opacity-100 transition opacity-0 font-bold text-xs absolute top-[45px] left-[10px]'>
                  Descripción
                </h1>
              </label>

              <div className='w-full flex items-center justify-end'>
                <button
                  type='submit'
                  className='hover:scale-105 transition w-28 rounded-3xl py-2 bg-textComun text-[#000] font-bold'
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>

          <div className='w-full mt-8'>
            <p className='w-full text-textWhite text-xs font-extrabold'>
              Al continuar, aceptas darle acceso a Spotify Clon a la imagen que
              decidas subir. Asegúrate de tener los derechos para subir la
              imagen.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export const ContextMenuOptions = ({ song }) => {
  const [existCurrentShanges, setExistShanges] = useState(false)
  const { addNewPlaylistCreated, setViewModals } = useSelectState()

  const {
    likeSongsList,
    addLikeSong,
    userPlaylistCreated,
    addSongToListCreated
  } = useSelectArtistState()
  const [newStatePlaylist, setNewStatePlaylist] = useState(userPlaylistCreated)
  const { existSong } = useLikeSongsFunctions(likeSongsList, song)
  const opt = useRef(userPlaylistCreated)
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

  return (
    <article
      ref={modalElement}
      className='absolute h-80 overflow-hidden left-[276px] z-[9999] w-72 flex flex-col gap-2 items-center bg-groundDark bottom-[70px] rounded-[4px] p-3'
    >
      <form className='flex flex-col gap-2 w-full'>
        <label
          htmlFor='input_search'
          className='text-textGray font-semibold text-xs'
        >
          Añadir a la lista
        </label>
        <Input id='input_search' placeholder='Busca una lista' />

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

        {userPlaylistCreated.map((option, index) => {
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
              (sn, i) => sn.songs.length !== userPlaylistCreated[i].songs.length
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
                <picture className='w-[34px] h-8 p-2 flex items-center rounded-sm bg-cardGroundSkeleton'>
                  {option.image !== null && (
                    <img src={option.image} alt='Image playlist' />
                  )}
                  {option.image === null && <SongIcon w={23} h={23} />}
                </picture>
                <div className='w-full font-medium'>{option.title}</div>
                {newStatePlaylist.find((i) => i?.id === option?.id) &&
                  !newStatePlaylist
                    .find((i) => i?.id === option?.id)
                    .songs.some((item) => item.id === song.id) && (
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
            Guardar
          </button>
        )}
      </footer>
    </article>
  )
}

export const NotificationBanner = ({ body = 'added changes' }) => {
  const { setViewModals, viewModals } = useSelectState()

  useEffect(() => {
    setTimeout(() => {
      setViewModals({ notification: false })
    }, 2000)
  }, [viewModals])

  return (
    <div className='w-44 absolute text-md font-light animate-fadeOut text-center p-2 left-[45%] bottom-[84px] z-[99999] rounded-md bg-white text-black'>
      <h4>{body}</h4>
    </div>
  )
}
