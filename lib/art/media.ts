export class Instrument {
  readonly #type: string
  readonly #items: string[]

  constructor(type: string, name?: string | Array<string> | undefined) {
    this.#type = type
    if (name == null) {
      this.#items = []
    } else if (Array.isArray(name)) {
      this.#items = name
    } else {
      this.#items = [name]
    }
  }

  static ColoredPencil = (items?: string[]) => new Instrument('Colored pencil', items)
  static Graphite = (items?: string[]) => new Instrument('Graphite', items)
  static Charcoal = (items?: string[]) => new Instrument('Charcoal', items)
  static Digital = (items?: string[]) => new Instrument('Digital', items)
  static Watercolor = (items?: string[]) => new Instrument('Watercolor', items)

  toShortString(): string {
    return this.#type
  }

  toLongString(): string | null {
    return this.#items.length > 0 ? toListString(this.#items, '&') : null
  }
}

export enum ColoredPencil {
  PrismacalorPremier = 'Prismacolor Premiers',
  FcPolychromos = 'FC Polychromos',
}

export enum GraphiteInstrument {
  FcPittGraphiteMattBlack = 'FC Pitt Graphite Matt Black pencils',
  SteadlerMarsLumograph = 'Steadler Mars Lumograph pencils',
}

export enum Paper {
  ArchesHotPressed300gsm = 'Arches hot pressed watercolor paper, 300gsm',
  ArchesColdPressed300gsm = 'Arches cold pressed watercolor paper, 300gsm',
  SaundersWaterford190gsm = 'Saunders Waterford watercolor paper, 190gsm',
  SaundersWaterford300gsm = 'Saunders Waterford watercolor paper, 300gsm',
  LegionStonehenge250gsm = 'Legion Stonehenge paper, 250gsm',
}

export interface Media {
  shortString: string
  readonly detailsString: string | null
}

export namespace Media {
  export function create(instruments: Instrument[], paper?: Paper | undefined): Media {
    if (instruments.length < 1) {
      throw Error('Invalid argument for "instruments". Array cannot be empty.')
    }

    const shortString = (() => {
      if (instruments.length === 1) {
        return instruments[0].toShortString()
      }
      return 'Mixed media'
    })()

    const detailsString = (() => {
      const instrumentsWithDetails = instruments.map((m) => m.toLongString()).filter((v) => v != null)
      if (instrumentsWithDetails.length < 1) {
        return null
      }
      const instrumentsPart = toListString(instrumentsWithDetails as string[], 'and')

      if (paper == null) {
        return instrumentsPart
      }

      return `${instrumentsPart} on ${paper}`
    })()

    return {
      shortString,
      detailsString,
    }
  }
}

function toListString(items: string[], conjunction: '&' | 'and'): string {
  if (items.length === 0) {
    throw Error('Cannot create English list from an empty array.')
  }

  if (items.length === 1) {
    return items[0]
  }

  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1].toString().toLowerCase()}`
  }

  return `${items.slice(0, items.length - 1).join(', ')}, ${conjunction} ${items[items.length - 1]}`
}
