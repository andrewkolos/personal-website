import React, { Ref, useEffect, useRef, useState } from 'react'
import { ReadingListEntry } from '../reading-list-entry'
import ReadingListing from '../reading-listing/reading-listing'
import Styles from './reading-list-month.module.scss'

export interface ReadingListMonthProps {
  expanded?: boolean
  entries: ReadingListEntry[]
}

const ReadingListMonth: React.FC<ReadingListMonthProps> = ({ expanded, entries }) => {
  const [expandedState, setExpandedState] = useState(expanded)
  const entriesDiv: Ref<HTMLDivElement> = useRef(null)

  const date = new Date(entries[0].date)
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const { current } = entriesDiv
    if (current == null) return

    if (expandedState) {
      current.style.height = `${Array.from(current.childNodes).reduce(
        (s, c) => s + ((c as HTMLElement).offsetHeight || 0),
        10,
      )}px`
    } else {
      current.style.height = '0px'
    }
  }, [expandedState])

  return (
    <div className={Styles.container} key={month + year}>
      <button className={Styles.titleWrapper} type="button" onClick={() => setExpandedState(!expandedState)}>
        <h2 className={Styles.title}>
          {' '}
          {month} {year}{' '}
        </h2>
        <span className={Styles.expandIcon}>{expandedState ? '−' : '+'}</span>
      </button>
      <div ref={entriesDiv} className={Styles.entries}>
        {entries.map((e) => (
          <ReadingListing key={e.url} entry={e} />
        ))}
      </div>
    </div>
  )
}

ReadingListMonth.defaultProps = {
  expanded: false,
}

export default ReadingListMonth
