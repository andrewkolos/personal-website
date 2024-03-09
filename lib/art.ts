export interface ArtEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  imageFilename: string
  media: string
  subtitle?: string
  date: string
  commentary?: string
  width: number
  height: number
  reference?: Reference
}

export interface Reference {
  url: string
  title: string
  providerName: string
}

namespace Media {
  const instrument = (media: string) => (inst?: string) => (inst == null ? media : `${media} (${inst})`)

  export const ColoredPencil = instrument('Colored pencil')
  export const Graphite = instrument('Graphite')
  export const Charcoal = instrument('Charcoal')
  export const Digital = instrument('Digital')

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
    media: Media.ColoredPencil(),
    imageFilename: 'scrub-jay.jpg',
    date: '2023/05/07',
    height: 2013,
    width: 2446,
  },
  {
    title: 'Tea Kettle',
    media: Media.ColoredPencil(),
    imageFilename: 'tea-kettle.jpg',
    date: '2023/05/13',
    height: 2327,
    width: 2808,
  },
  {
    title: 'Hummingbird',
    media: Media.Graphite(),
    imageFilename: 'hummingbird.jpg',
    date: '2023/05/17',
    height: 2967,
    width: 3877,
  },
  {
    title: 'Cardinal from Photo Reference',
    imageFilename: 'cardinal.jpg',
    media: Media.Graphite(),
    date: '2023/05/20',
    width: 2377,
    height: 2645,
  },
  {
    title: 'Contour of a Tortoise from Photo Reference',
    media: Media.Graphite(),
    imageFilename: 'tortoise.jpg',
    date: '2023/06/10',
    height: 3072,
    width: 3907,
  },
  {
    title: 'Tortoise from Photo Reference',
    media: Media.Digital(),
    imageFilename: 'tortoise-digital.jpg',
    date: '2023/06/18',
    height: 3367,
    width: 4853,
  },
  {
    title: 'Pear from Photo Reference',
    media: Media.Digital(),
    imageFilename: 'pear.jpg',
    date: '2023/07/02',
    height: 2400,
    width: 4000,
  },
  {
    title: 'Hovering cartoon pigeon',
    media: Media.Graphite(),
    imageFilename: 'hovering_pigeon.jpg',
    date: '2023/07/28',
    height: 931,
    width: 1174,
  },
  {
    title: `Bell's Sparrow`,
    media: Media.Graphite(),
    imageFilename: 'bells-sparrow.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1780,
    reference: {
      url: 'https://www.birdpixel.com/Birds/New-World-Sparrows/Bells-Sparrow/i-RfZbhHt/A',
      title: "Bell's Sparrow - Taft, CA, USA",
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Rose-breasted Grosbeak`,
    media: Media.Graphite(),
    imageFilename: 'rose-breasted-grosbeak.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1724,
  },
  {
    title: `Red-breasted Blackbird`,
    media: Media.join(Media.Graphite(), Media.Charcoal()),
    imageFilename: 'red-breasted-blackbird.jpg',
    date: '2023/08/06',
    height: 2208,
    width: 2546,
    reference: {
      url: 'https://www.birdpixel.com/Birds/Troupials/Red-breasted-Blackbird/i-fxV29Q7',
      title: 'Red-breasted Blackbird - Nariva Swamp, Trinidad',
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.Graphite(),
    imageFilename: 'chestnut-backed-chickadee.jpg',
    date: '2023/09/09',
    height: 2352,
    width: 2917,
    reference: {
      url: 'https://birdpixel.com/Birds/Chickadees-Tits/Chestnut-backed-Chickadee/i-P2RL6Wf',
      title: 'Chestnut-backed Chickadee - Coyote Hills Park, Fremont, CA',
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.Graphite(),
    imageFilename: 'chestnut-backed-chickadee-2.jpg',
    date: '2023/09/12',
    height: 3069,
    width: 2302,
    reference: {
      url: 'https://www.birdpixel.com/Birds/Chickadees-Tits/Chestnut-backed-Chickadee/i-HD7QkMJ',
      title: 'Chestnut-backed Chickadee - Santa Cruz Mountains, CA, USA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: `Large Cuckooshrike`,
    media: Media.Graphite(),
    imageFilename: 'large-cuckooshrike.jpg',
    date: '2023/11/05',
    height: 3779,
    width: 2681,
    reference: {
      url: 'https://www.birdpixel.com/Birds/Cuckooshrikes/Large-Cuckooshrike/i-kFhcLjs/A',
      title: 'Large Cuckooshrike - Record - Pench National Park, Madhya Pradesh, India',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Sooty-capped Bush-Tanager',
    media: Media.Graphite(),
    imageFilename: 'sooty-capped-bush-tanager.jpg',
    date: '2023/11/12',
    height: 2086,
    width: 3254,
    reference: {
      url: 'https://www.birdpixel.com/Birds/New-World-Sparrows/Sooty-capped-Bush-Tanager/i-ns5W7PP/A',
      title: 'Sooty-capped Bush-Tanager - Cabanas Los Quetzales, Guadalupe, PA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Long-eared owl',
    media: Media.ColoredPencil(),
    imageFilename: 'long-eared-owl.jpg',
    date: '2023/12/16',
    height: 3516,
    width: 2602,
    reference: {
      url: 'https://www.birdpixel.com/Birds/Owls/Long-Eared-Owl-1/i-xFZLvXs/A',
      title: 'Long-Eared Owl, Mercey Hot Springs, CA',
      providerName: 'Vivek Khanzode',
    },
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()

export const sketchbookEntries: ArtEntry[] = [
  {
    title: 'Spheres',
    media: Media.Graphite(),
    imageFilename: 'sphere-sketch.jpg',
    date: '2024/03/09',
    width: 3203,
    height: 2288,
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()
