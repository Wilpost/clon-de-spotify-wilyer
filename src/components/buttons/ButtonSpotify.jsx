import { usePlaySong } from '../../hooks/usePlaySong'
import { useSelectArtistState } from '../../hooks/useSelectState'
import { IconPause, IconPlay } from '../../icons/Icons'

export const ButtonSpotify = ({ song, big = false, disabled = false }) => {
  const { albums, userLibrary } = useSelectArtistState()
  const { audioControl } = usePlaySong()
  const { likeSongsList, userPlaylistCreated } = userLibrary

  return (
    <button
      disabled={disabled}
      onClick={() => {
        audioControl({
          albumId:
            song.type === 'myPlaylist'
              ? 'likedPlaylist'
              : song.data?.id ?? song.id,
          list:
            (song?.type === 'myPlaylist' && likeSongsList.items) ||
            (song?.type === 'playlist' && song.data?.tracks?.items) ||
            song.tracks?.items ||
            (song?.type === 'album' && song.data?.tracks?.items) ||
            song.tracks?.items ||
            (song?.type === 'userPlaylist' && song.data?.songs) ||
            song.songs,
          type:
            (song?.type === 'playlist' && 'album') ||
            (song?.type === 'userPlaylist' && 'myPlaylistCreated') ||
            song?.type,
          albums:
            (song?.type === 'myPlaylist' && likeSongsList.items) ||
            (song?.type === 'album' && albums) ||
            (song?.type === 'playlist' && albums) ||
            (song?.type === 'userPlaylist' && userPlaylistCreated)
        })
      }}
      className={`${disabled ? '' : 'hover:scale-110'} ${
        big ? 'w-[59px] h-[59px]' : 'w-[50px] h-[50px]'
      } bg-textGreenSpotify outline-none  scale-105 active:scale-105 p-3 grid place-content-center rounded-full`}
    >
      {song?.hear ? <IconPause w={21} h={21} /> : <IconPlay w={20} h={20} />}
    </button>
  )
}
