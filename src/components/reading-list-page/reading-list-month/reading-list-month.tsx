import React, { Ref, useEffect, useRef, useState } from 'react';
import { ReadingListEntry } from '../reading-list/reading-list';
import SharedStyles from '../../../shared-styles.module.scss';
import ReadingListing from '../reading-listing/reading-listing';
import Styles from './reading-list-month.module.scss';

export interface ReadingListMonthProps {
  expanded?: boolean;
  entries: ReadingListEntry[];
}

const ReadingListMonth: React.FC<ReadingListMonthProps> = (props) => {

  const [expanded, setExpanded] = useState(props.expanded);
  const entriesDiv: Ref<HTMLDivElement> = useRef(null);

  const month = props.entries[0].date.toLocaleString('default', { month: 'long' });
  const year = props.entries[0].date.getFullYear();

  useEffect(() => {
    const { current } = entriesDiv;
    if (current == null) return;

    if (expanded) {
      current.style.height = Array.from(current.childNodes).reduce((s, c) => s + ((c as HTMLElement).offsetHeight || 0), 10) + 'px';
    } else {
      current.style.height = '0px';
    }
  }, [expanded]);

  return (
    <div className={Styles.container} >
      <button className={Styles.titleWrapper} onClick={() => setExpanded(!expanded)}>
        <h2 className={Styles.title}> {month} {year} </h2>
        <span className={Styles.expandIcon}>{expanded ? '−' : '+'}</span>
      </button>
      <div ref={entriesDiv} className={Styles.entries}>
        {props.entries.map(e => <ReadingListing entry={e} />)}
      </div>
    </div>
  );
};

export default ReadingListMonth;