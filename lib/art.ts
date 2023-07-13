export interface ArtEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  imageFilename: string
  subtitle?: string
  date: string
  commentary?: string
  width: number
  height: number
}

export const artEntries: ArtEntry[] = [
  {
    title: 'Pencil contour of a Tortoise from Photo Reference',
    imageFilename: 'tortoise.jpg',
    date: '2022/06/10',
    height: 3072,
    width: 3907,
  },
  {
    title: 'Digital painting of a Tortoise from Photo Reference',
    imageFilename: 'tortoise-digital.png',
    date: '2022/06/18',
    height: 3367,
    width: 4853,
  },
]
