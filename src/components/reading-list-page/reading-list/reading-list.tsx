import React from 'react';
import ReadingListMonth from '../reading-list-month/reading-list-month';
import Styles from './reading-list.module.scss';
import SharedStyles from '../../../shared-styles.module.scss';
import { ReadingListEntry } from '../reading-list-entry';

export interface ReadingListProps {
  entries: ReadingListEntry[];
}

const ReadingList: React.FC<ReadingListProps> = (props) => {
  const byMonth = props.entries.map(d => ({ ...d, date: new Date(d.date) }))
    .reduce((map, current) => {
      const year = current.date.getFullYear();
      const month = current.date.getMonth();
      const key = `${year}${month}`;
      const entries = map.has(key) ? map.get(key)! : [];
      entries.push({...current, date: current.date.toString()});
      map.set(key, entries);
      return map;
    }, new Map<string, ReadingListEntry[]>())

  const months = Array.from(byMonth.entries()).sort((e, o) => o[0].localeCompare(e[0]));

  return (
    <div className={SharedStyles.card}>
      <h2>Reading List</h2>
      <p>Stuff I've been reading, by the date I read it, if you are interested.</p>

      <div>
        {months.map((m, i) => <ReadingListMonth key={i} expanded={i === 0} entries={m[1]} />)}
      </div>
    </div>
  );
};

export default ReadingList;
