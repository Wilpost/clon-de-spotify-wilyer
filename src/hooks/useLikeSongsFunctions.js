export const useLikeSongsFunctions = (arr = [], data) => {
  const existSong = arr?.items?.some((item) => item.id === data.id)

  return { existSong }
}
