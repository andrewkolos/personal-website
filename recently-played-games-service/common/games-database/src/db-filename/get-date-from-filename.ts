export function getDateFromFilename(filename: string): Date {
  const matchArray = /(\d+)-(\d+)-(\d+)/.exec(filename)

  if (matchArray == null) {
    throw Error(`Couldn't parse date out of the filename. Filename: ${filename}`)
  }
  const [year, month, date] = matchArray.slice(1)
  return new Date(Number(year), Number(month), Number(date))
}
