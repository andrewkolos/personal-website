import React from 'react'
import SharedStyles from '../../../styles/shared-styles.module.scss'
import { ReadingListEntry } from '../reading-list-entry'
import ReadingListMonth from '../reading-list-month/reading-list-month'

export interface ReadingListProps {
  entries: ReadingListEntry[]
}

const ReadingList: React.FC<ReadingListProps> = ({ entries }) => {
  const sorted = [...entries].sort((a, b) => Number(a > b))
  const groupedByYearMonth = Array.from(
    sorted
      .reduce((result, entry) => {
        const date = new Date(entry.date)
        const yearmonth = `${date.getUTCFullYear()}${date.getUTCMonth()}`
        const grouping = result.get(yearmonth) ?? []
        grouping.push(entry)
        result.set(yearmonth, grouping)
        return result
      }, new Map<string, ReadingListEntry[]>())
      .values(),
  )

  return (
    <div className={SharedStyles.card}>
      <h2>Reading List</h2>
      <p>
        I try to read something every day. Articles that teach me something interesting or get to me critically think
        about a topic get listed here.
      </p>
      <div>
        {groupedByYearMonth.map((m, i) => (
          <ReadingListMonth key={i} expanded={i === 0} entries={m} />
        ))}
      </div>
    </div>
  )
}

export default ReadingList
