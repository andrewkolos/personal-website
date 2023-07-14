export interface ArtEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  imageFilename: string
  media: String
  subtitle?: string
  date: string
  commentary?: string
  width: number
  height: number
}

// For convenience only.
enum Media {
  ColoredPencil = 'Colored pencil',
  Graphite = 'Graphite',
  Digital = 'Digital',
}

export const artEntries: ArtEntry[] = [
  {
    title: 'Study of Scrub Jay drawing by Brent Eviston',
    media: Media.ColoredPencil,
    imageFilename: 'scrub-jay.jpg',
    date: '2023/05/07',
    height: 2013,
    width: 2446,
  },
  {
    title: 'Tea Kettle from Photo Reference',
    media: Media.ColoredPencil,
    imageFilename: 'tea-kettle.jpg',
    date: '2023/05/13',
    height: 2327,
    width: 2808,
  },
  {
    title: 'Hummingbird from Photo Reference',
    media: Media.Graphite,
    imageFilename: 'hummingbird.jpg',
    date: '2023/05/17',
    height: 2967,
    width: 3877,
  },
  {
    title: 'Cardinal from Photo Reference',
    imageFilename: 'cardinal.jpg',
    media: Media.Graphite,
    date: '2023/05/20',
    width: 4080,
    height: 3072,
  },
  {
    title: 'Contour of a Tortoise from Photo Reference',
    media: Media.Graphite,
    imageFilename: 'tortoise.jpg',
    date: '2023/06/10',
    height: 3072,
    width: 3907,
  },
  {
    title: 'Tortoise from Photo Reference',
    media: Media.Digital,
    imageFilename: 'tortoise-digital.jpg',
    date: '2023/06/18',
    height: 3367,
    width: 4853,
  },
  {
    title: 'Pear from Photo Reference',
    media: Media.Digital,
    imageFilename: 'pear.jpg',
    date: '2023/07/02',
    height: 2400,
    width: 4000,
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()
