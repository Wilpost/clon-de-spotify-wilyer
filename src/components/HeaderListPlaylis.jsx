import { useSelectState } from '../hooks/useSelectState'
import {
  IconAccount,
  IconArrowLeft,
  IconArrowRigth,
  IconNotifications
} from '../icons/Icons'

export const HeaderListPlaylist = () => {
  const { backdropColor, scroll, deployNavbar } = useSelectState()

  const handleButtonBack = () => {
    window.history.back()
  }

  const handleButtonNext = () => {
    window.history.go(1)
  }

  return (
    <header
      style={{
        background: scroll > 187 ? backdropColor : 'transparent',
        zIndex: 99999
      }}
      className={`${
        deployNavbar ? 'w-[1273px] left-[85px]' : 'w-[992px] left-[366px]'
      } transition duration-500 fixed rounded-t-md h-[59px] top-[7px] pr-8 flex flex-col p-4`}
    >
      <div className='w-full h-full flex justify-between items-start'>
        <div className='w-full flex gap-2 h-1'>
          <button
            title='Retroceder'
            disabled={window.location.href === 'http://localhost:5173/'}
            onClick={(e) => handleButtonBack(e)}
            className='disabled:opacity-60 scale-95 opacity-75 transition-bg duration-300 w-8 h-8 grid place-content-center bg-arrowGround rounded-full'
          >
            <IconArrowLeft />
          </button>
          <button
            title='Avanzar'
            disabled={!window.navigation.canGoForward}
            onClick={(e) => handleButtonNext(e)}
            className='disabled:opacity-60 scale-95 opacity-75 transition-bg duration-300 w-8 h-8  grid place-content-center bg-arrowGround rounded-full'
          >
            <IconArrowRigth />
          </button>
        </div>

        <div className='flex gap-2 items-center justify-center h-full'>
          <button className='p-3 hover:bg-groundColor w-8 h-8 grid place-content-center bg-groundDark rounded-full'>
            <IconNotifications />
          </button>
          <button className='p-3 hover:bg-groundColor w-8 h-8 grid place-content-center bg-groundDark rounded-full'>
            <IconAccount />
          </button>
        </div>
      </div>
    </header>
  )
}
