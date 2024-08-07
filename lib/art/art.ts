import { ColoredPencil, GraphiteInstrument, Instrument, Media } from './media'

export interface ArtEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  imageFilename: string
  media: Media
  subtitle?: string
  date: string
  commentary?: string
  width: number
  height: number
  thumbPosition: {
    width: number // e.g. 20, which will be transformed to '20%'
    height: number
  }
  reference?: Reference
}

export interface Reference {
  url: string
  title: string
  providerName: string
}

export const galleryEntries: ArtEntry[] = [
  {
    title: 'Study of Scrub Jay drawing by Brent Eviston',
    media: Media.create([Instrument.ColoredPencil()]),
    imageFilename: 'scrub-jay.jpg',
    date: '2023/05/07',
    height: 2013,
    width: 2446,
    thumbPosition: {
      width: 20,
      height: 10,
    },
  },
  {
    title: 'Tea Kettle',
    media: Media.create([Instrument.ColoredPencil()]),
    imageFilename: 'tea-kettle.jpg',
    date: '2023/05/13',
    height: 2327,
    width: 2808,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Hummingbird',
    media: Media.create([Instrument.Graphite()]),
    imageFilename: 'hummingbird.jpg',
    date: '2023/05/17',
    height: 2967,
    width: 3877,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Cardinal from Photo Reference',
    imageFilename: 'cardinal.jpg',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    date: '2023/05/20',
    width: 2377,
    height: 2645,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Contour of a Tortoise from Photo Reference',
    media: Media.create([Instrument.Graphite()]),
    imageFilename: 'tortoise.jpg',
    date: '2023/06/10',
    height: 3072,
    width: 3907,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Tortoise from Photo Reference',
    media: Media.create([Instrument.Digital()]),
    imageFilename: 'tortoise-digital.jpg',
    date: '2023/06/18',
    height: 3367,
    width: 4853,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Pear from Photo Reference',
    media: Media.create([Instrument.Digital()]),

    imageFilename: 'pear.jpg',
    date: '2023/07/02',
    height: 2400,
    width: 4000,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Hovering cartoon pigeon',
    media: Media.create([Instrument.Digital()]),
    imageFilename: 'hovering_pigeon.jpg',
    date: '2023/07/28',
    height: 931,
    width: 1174,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: `Bell's Sparrow`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'bells-sparrow.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1780,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/New-World-Sparrows/Bells-Sparrow/i-RfZbhHt/A',
      title: "Bell's Sparrow - Taft, CA, USA",
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Rose-breasted Grosbeak`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'rose-breasted-grosbeak.jpg',
    date: '2023/08/05',
    height: 1690,
    width: 1724,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: `Red-breasted Blackbird`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'red-breasted-blackbird.jpg',
    date: '2023/08/06',
    height: 2208,
    width: 2546,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Troupials/Red-breasted-Blackbird/i-fxV29Q7',
      title: 'Red-breasted Blackbird - Nariva Swamp, Trinidad',
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'chestnut-backed-chickadee.jpg',
    date: '2023/09/09',
    height: 2352,
    width: 2917,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://birdpixel.com/Birds/Chickadees-Tits/Chestnut-backed-Chickadee/i-P2RL6Wf',
      title: 'Chestnut-backed Chickadee - Coyote Hills Park, Fremont, CA',
      providerName: 'Vivek Khazode',
    },
  },
  {
    title: `Chestnut-backed Chickadee`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'chestnut-backed-chickadee-2.jpg',
    date: '2023/09/12',
    height: 3069,
    width: 2302,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Chickadees-Tits/Chestnut-backed-Chickadee/i-HD7QkMJ',
      title: 'Chestnut-backed Chickadee - Santa Cruz Mountains, CA, USA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: `Large Cuckooshrike`,
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'large-cuckooshrike.jpg',
    date: '2023/11/05',
    height: 3779,
    width: 2681,
    thumbPosition: {
      width: 50,
      height: 5,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Cuckooshrikes/Large-Cuckooshrike/i-kFhcLjs/A',
      title: 'Large Cuckooshrike - Record - Pench National Park, Madhya Pradesh, India',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Sooty-capped Bush-Tanager',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'sooty-capped-bush-tanager.jpg',
    date: '2023/11/12',
    height: 2086,
    width: 3254,
    thumbPosition: {
      width: 40,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/New-World-Sparrows/Sooty-capped-Bush-Tanager/i-ns5W7PP/A',
      title: 'Sooty-capped Bush-Tanager - Cabanas Los Quetzales, Guadalupe, PA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Long-eared owl',
    media: Media.create([Instrument.ColoredPencil([ColoredPencil.FcPolychromos])]),
    imageFilename: 'long-eared-owl.jpg',
    date: '2023/12/16',
    height: 3516,
    width: 2602,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Owls/Long-Eared-Owl-1/i-xFZLvXs/A',
      title: 'Long-Eared Owl, Mercey Hot Springs, CA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Chestnut-backed-chickadee',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.SteadlerMarsLumograph])]),
    imageFilename: 'chestnut-backed-chickadee-3.jpg',
    date: '2024/1/22',
    height: 3516,
    width: 2602,
    thumbPosition: {
      width: 50,
      height: 50,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Chickadees-Tits/Chestnut-backed-Chickadee/i-CJgXJzZ',
      title: 'Chestnut-backed Chickadee - Santa Cruz Mountains, CA, USA',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Cardinal',
    media: Media.create([Instrument.ColoredPencil([ColoredPencil.FcPolychromos])]),
    imageFilename: 'cardinal-in-snow.jpg',
    date: '2024/2/25',
    height: 2499,
    width: 1837,
    thumbPosition: {
      width: 50,
      height: 30,
    },
  },
  {
    title: 'Chimango Caracara',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),
    imageFilename: 'caracara.jpg',
    date: '2024/4/25',
    height: 3381,
    width: 2490,
    thumbPosition: {
      width: 10,
      height: 10,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Falcons-Caracaras/Chimango-Caracara/i-ThqLsqJ/A',
      title: 'Chimango Caracara - Tierra del Fuego NP, Argentina',
      providerName: 'Vivek Khanzode',
    },
  },
  {
    title: 'Rock Wren',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),
    imageFilename: 'rock-wren.jpg',
    date: '2024/6/23',
    height: 2356,
    width: 3295,
    thumbPosition: {
      width: 10,
      height: 10,
    },
    reference: {
      url: 'https://www.birdpixel.com/Birds/Wrens/Rock-Wren/i-hH2B79w/A',
      title: 'Rock Wren - San Jose, CA, USA',
      providerName: 'Vivek Khanzode',
    },
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()

export const sketchbookEntries: ArtEntry[] = [
  {
    title: 'Spheres',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),

    imageFilename: 'sphere-sketch.jpg',
    date: '2024/03/09',
    width: 3203,
    height: 2288,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reverse()
