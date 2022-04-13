export function makeDbFilenameFromDate(date: Date): string {
  return `db-${dateAsFilenamePart(date)}.json`
}

function dateAsFilenamePart(date: Date): string {
  return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date
    .getUTCDate()
    .toString()
    .padStart(2, '0')}`
}
