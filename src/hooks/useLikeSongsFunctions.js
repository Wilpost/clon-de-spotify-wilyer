export const useLikeSongsFunctions = (arr = [], data) => {
  const existSong = arr.find((item) => item.id === data.id)

  return { existSong }
}
