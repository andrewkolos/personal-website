import React from 'react';
import { ReadingListEntry } from "../reading-list-entry";
import SharedStyles from '../../../shared-styles.module.scss';
import Styles from './reading-listing.module.scss';

export interface ReadingListingProps {
  entry: ReadingListEntry;
}

const ReadingList: React.FC<ReadingListingProps> = (props) => {
  const { url, description, imgUrl, title } = props.entry;

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <a href={url}>
          <div className={Styles.imageContainer}>
            <img src={imgUrl} className={Styles.image} ></img>
          </div>
        </a>
        <div className={Styles.textContent}>
            <a className={Styles.titleWrapper} href={url}>
              <h2 className={Styles.title}>{title}</h2>
            </a>
          <span className={Styles.description}>{description}</span>
        </div>
      </div>
    </div>
  );
}

export default ReadingList;