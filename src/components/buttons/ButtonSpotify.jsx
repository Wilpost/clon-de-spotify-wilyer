import { IconPause, IconPlay } from '../../icons/Icons'

export const ButtonSpotify = ({
  song,
  big = false,
  onClick,
  disabled = false
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={`${disabled ? '' : 'hover:scale-110'} ${
        big ? 'w-[59px] h-[59px]' : 'w-[50px] h-[50px]'
      } bg-textGreenSpotify outline-none  scale-105 active:scale-105 p-3 grid place-content-center rounded-full`}
    >
      {song?.hear ? <IconPause w={21} h={21} /> : <IconPlay w={20} h={20} />}
    </button>
  )
}
