import { useEffect } from 'react'
import { useSelectState } from '../../hooks/useSelectState'

export const NotificationBanner = ({ body = 'added changes' }) => {
  const { setViewModals, viewModals } = useSelectState()

  useEffect(() => {
    setTimeout(() => {
      setViewModals({ notification: false })
    }, 2000)
  }, [viewModals])

  return (
    <div className='w-44 absolute text-md font-normal animate-fadeOut text-center p-2 left-[45%] bottom-[84px] z-[99999] rounded-md bg-white text-black'>
      <h4>{body}</h4>
    </div>
  )
}
