export function getDateFromFilename(filename: string): Date {
  const matchArray = /(\d+)-(\d+)-(\d+)/.exec(filename)

  if (matchArray == null) {
    throw Error(`Couldn't parse date out of the filename. Filename: ${filename}`)
  }

  return new Date(matchArray[0])
}
