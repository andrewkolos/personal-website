import React from 'react';
import { ReadingListEntry } from '../reading-list/reading-list';
import SharedStyles from '../../../shared-styles.module.scss'; 
import Styles from './reading-listing.module.scss';

export interface ReadingListingProps {
  entry: ReadingListEntry;
}

const ReadingList: React.FC<ReadingListingProps> = (props) => {
  const { date, url } = props.entry;

  return (
    <div className={Styles.container}>
      {date.toString()}
      {url}
    </div>
  );
}

export default ReadingList;