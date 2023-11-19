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
  Charcoal = 'Charcoal',
  Digital = 'Digital',
}

namespace Media {
  export function join(...values: string[]): string {
    if (values.length === 0) {
      throw Error('Need at lest two media string to join.')
    }
    if (values.length === 2) {
      return `${values[0]} and ${values[1].toLowerCase()}`
    }

    return `${values.slice(0, values.length - 1).join(', ')}, and ${values[values.length - 1]}`
  }
}

export const galleryEntries: ArtEntry[] = [
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
    width: 2377,
    height: 2645,
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
  {
    title: 'Hovering cartoon pigeon',
    media: Media.Graphite,
    imageFilename: 'hovering_pigeon.jpg',
    date: '2023/07/28',
    height: 931,
    width: 1174,
  },
  {
    title: `Bell's Sparrow`,
    media: Media.Graphite,
    imageFilename: 'bells-sparrow.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1780,
  },
  {
    title: `Rose-breasted Grosbeak`,
    media: Media.Graphite,
    imageFilename: 'rose-breasted-grosbeak.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1724,
  },
  {
    title: `Red-breasted Blackbird`,
    media: Media.join(Media.Graphite, Media.Charcoal),
    imageFilename: 'red-breasted-blackbird.jpg',
    date: '2023/08/06',
    height: 2208,
    width: 2546,
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.Graphite,
    imageFilename: 'chestnut-backed-chickadee.jpg',
    date: '2023/09/09',
    height: 2352,
    width: 2917,
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.Graphite,
    imageFilename: 'chestnut-backed-chickadee-2.jpg',
    date: '2023/09/12',
    height: 3069,
    width: 2302,
  },
  {
    title: `Large Cuckooshrike`,
    media: Media.Graphite,
    imageFilename: 'large-cuckooshrike.jpg',
    date: '2023/11/05',
    height: 3779,
    width: 2681,
  },
  {
    title: 'Sooty-capped Bush-Tanager',
    media: Media.Graphite,
    imageFilename: 'sooty-capped-bush-tanager.jpg',
    date: '2023/11/12',
    height: 2086,
    width: 3254,
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()
