import { useRef, useState } from 'react'
import {
  useSelectArtistState,
  useSelectState
} from '../../hooks/useSelectState'
import { CloseIcon, EditIcon, SongIcon } from '../../icons/Icons'
import { Input } from '../inputs/Input'

export const CreatePlaylistModal = ({ id }) => {
  const { setViewModals, updateHearDataSongRecent } = useSelectState()
  const { updatePlaylistCreated, userLibrary } = useSelectArtistState()
  const { userPlaylistCreated } = userLibrary
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

    updateHearDataSongRecent(id, {
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
