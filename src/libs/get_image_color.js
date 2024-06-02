import { extractColors } from 'extract-colors'

export async function fetchImageColor(path) {
  const colorsFound = await extractColors(path, {
    crossOrigin: '',
    pixels: 64000,
    distance: 0.22,
    colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
    saturationDistance: 0.2,
    lightnessDistance: 0.2,
    hueDistance: 0.083333333
  })

  const allColors = colorsFound.map((color) => color.hex)
  console.log(allColors)

  return allColors[0]
}
