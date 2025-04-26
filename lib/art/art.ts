import { ColoredPencil, GraphiteInstrument, Instrument, Media, Paper } from './media'

export enum ArtEntryType {
  Normal,
  Sketch,
  Experiment,
}
export interface ArtEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  imageFilename: string
  type: ArtEntryType
  media: Media
  subtitle?: string
  date: string
  page?: number
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
  url: string | null,
  title: string | null,
  providerName: string
}

// Filtered galleryEntries - excluding ArtEntryType.Experiment
export const galleryEntries: ArtEntry[] = [
  {
    title: 'Study of Scrub Jay drawing by Brent Eviston',
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
    title: 'Spheres',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),
    type: ArtEntryType.Sketch,
    imageFilename: 'sphere-sketch.jpg',
    date: '2024/03/09',
    width: 3203,
    height: 2288,
    thumbPosition: {
      width: 50,
      height: 50,
    },
  },
  {
    title: 'Chimango Caracara',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),
    type: ArtEntryType.Normal,
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
    type: ArtEntryType.Normal,
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
  {
    title: 'Chautauqua Trail, Boulder, CO',
    media: Media.create([Instrument.Watercolor([])]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-07-11-boulder-co.jpg',
    height: 2727,
    width: 3610,
    date: '2024/7/11',
    reference: {
      url: 'https://photos.google.com/share/AF1QipM0j5ajwqf6Rjwr7mo1GOgfrbwOs8R52Q07KLYcfJ3nczxBuqgSEB3iZ8Fsc7NVyg/photo/AF1QipNnHOkJwFQbLtt9W2-pE3J5P9SM4juhbXcnxT8J?key=SXpQVEFRNG9xNGQyVE1feUZzZkF2ZEV0ZEQxdXBn',
      title: 'Chautauqua Trail, Boulder, CO',
      providerName: 'Andrew Kolos',
    },
    thumbPosition: {
      width: 0,
      height: 0,
    },
  },
  {
    title: 'Black cat',
    media: Media.create([Instrument.Watercolor([])]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-08-01-black-cat.jpg',
    date: '2024/08/01',
    page: 1,
    width: 2724,
    height: 3662,
    thumbPosition: {
      width: 10,
      height: 20,
    },
  },
  {
    title: 'Rose',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-07-18-1-rose.jpg',
    date: '2024/07/18',
    page: 1,
    width: 3470,
    height: 2600,
    thumbPosition: {
      width: 10,
      height: 20,
    },
  },
  {
    title: 'Tanager (line drawing provided by John Muir Laws)',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Sketch,
    imageFilename: '2024-07-25-1-tanager.jpg',
    date: '2024/07/25',
    page: 1,
    width: 2537,
    height: 2723,
    thumbPosition: {
      width: 10,
      height: 20,
    },
  },
  {
    title: 'Black cat',
    media: Media.create([Instrument.Watercolor([])]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-08-01-2-black-cat.jpg',
    date: '2024/08/01',
    page: 2,
    width: 2656,
    height: 3552,
    thumbPosition: {
      width: 10,
      height: 10,
    },
  },
  {
    title: 'Goldfish',
    media: Media.create([Instrument.Graphite([GraphiteInstrument.FcPittGraphiteMattBlack])]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-08-19-1-goldfish.jpg',
    date: '2024/08/19',
    width: 3812,
    height: 2824,
    thumbPosition: {
      width: 25,
      height: 15,
    },
  },
  {
    title: 'Goldfish',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-08-23-1-goldfish.jpg',
    date: '2024/08/23',
    page: 1,
    width: 3549,
    height: 2692,
    thumbPosition: {
      width: 10,
      height: 10,
    },
  },
  {
    title: 'Goldfish',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-08-25-1-goldfish.jpg',
    date: '2024/08/25',
    page: 1,
    width: 3722,
    height: 2814,
    thumbPosition: {
      width: 10,
      height: 10,
    },
  },
  {
    title: 'Bunny',
    media: Media.create([Instrument.Graphite()], Paper.LegionStonehenge250gsm),
    type: ArtEntryType.Normal,
    imageFilename: '2024-09-10-1-bunny.jpg',
    date: '2024/09/10',
    width: 3421,
    height: 2637,
    thumbPosition: {
      width: 10,
      height: 10
    },
    reference: {
      url: null,
      title: null,
      providerName: 'Esi Grunhagen',
    }
  },
  {
    title: 'Fruit',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Normal,
    imageFilename: '2024-09-21-1-fruit.jpg',
    date: '2024/09/21',
    page: 1,
    width: 3776,
    height: 2804,
    thumbPosition: {
      width: 10,
      height: 10,
    },
  },
  {
    title: 'Apples',
    media: Media.create([Instrument.Watercolor()]),
    type: ArtEntryType.Sketch,
    imageFilename: '2024-09-25-1-apples.jpg',
    date: '2024/09/25',
    page: 1,
    width: 3550,
    height: 2745,
    thumbPosition: {
      width: 10,
      height: 10,
    },
  },
  {
    title: 'Pumpkin',
    media: Media.create([Instrument.ColoredPencil()], Paper.LegionStonehenge250gsm),
    type: ArtEntryType.Sketch,
    imageFilename: '2024-10-3-1-pumpkin.jpg',
    date: '2024/10/03',
    width: 2400,
    height: 3183,
    thumbPosition: {
      width: 5,
      height: 5,
    },
  },
  {
    title: 'European Robin',
    media: Media.create([Instrument.Watercolor()], Paper.ArchesColdPressed300gsm),
    type: ArtEntryType.Normal,
    imageFilename: '2025-02-07-european-robin.jpg',
    date: '2025-02-07',
    width: 2141,
    height: 3070,
    thumbPosition: {
      width: 5,
      height: 5,
    },
    reference: {
      url: 'https://pixabay.com/photos/robin-bird-animal-european-robin-7816199/',
      title: null,
      providerName: 'Jon Pauling',
    }
  },
  {
    title: 'Western Bluebird',
    media: Media.create([Instrument.Watercolor()], Paper.ArchesColdPressed300gsm),
    type: ArtEntryType.Normal,
    imageFilename: '2025-02-12-western-bluebird.jpg',
    date: '2025-02-07',
    width: 2963,
    height: 2184,
    thumbPosition: {
      width: 5,
      height: 5,
    },
    reference: {
      url: null,
      title: null,
      providerName: 'Linda Anderson on PaintMyPhoto',
    }
  },
  {
    title: 'Austrailian Green Tree Frog',
    media: Media.create([Instrument.Watercolor()], Paper.ArchesColdPressed300gsm),
    type: ArtEntryType.Normal,
    imageFilename: '2025-02-22-austrailian-green-tree-frog.jpg',
    date: '2025-02-07',
    width: 2141,
    height: 3070,
    thumbPosition: {
      width: 5,
      height: 5,
    },
    reference: {
      url: 'https://wildlifereferencephotos.com/media.details.php?mediaID=58405',
      title: 'Austrailian Green Tree Frog',
      providerName: 'Wendy Sinclair',
    }
  },
]