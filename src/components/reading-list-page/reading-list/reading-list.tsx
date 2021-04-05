import React from 'react';
import ReadingListMonth from '../reading-list-month/reading-list-month';
import Styles from './reading-list.module.scss';
import SharedStyles from '../../../shared-styles.module.scss';

export interface ReadingListEntry {
  date: Date;
  url: string;
}
export interface ReadingListProps {
  entries: ReadingListEntry[];
}

const ReadingList: React.FC<ReadingListProps> = (props) => {
  const byMonth = props.entries.reduce((map, current) => {
    const year = current.date.getFullYear();
    const month = current.date.getMonth();
    const entries = map.has(month) ? map.get(month)! : [];
    entries.push(current);
    map.set(month, entries);
    return map;
  }, new Map<number, ReadingListEntry[]>())

  const months = Array.from(byMonth.entries());

  return (
    <div className={SharedStyles.card}>
      <h2>Reading List</h2>
      <p>Stuff I've been reading, by the date I read it, if you are interested.</p>

      <div>
        {months.map(m => <ReadingListMonth entries={m[1]} />)}
      </div>
    </div>
  );
};

export default ReadingList;
