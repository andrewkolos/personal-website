import React from 'react'
import MarkdownView from 'react-showdown'
import { ReadingListEntry } from '../reading-list-entry'
import Styles from './reading-listing.module.scss'

export interface ReadingListingProps {
  entry: ReadingListEntry
}

const ReadingList: React.FC<ReadingListingProps> = ({ entry }) => {
  const { url, description, imgUrl, title, blurb } = entry

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <div className={Styles.textContent}>
          <a className={Styles.titleWrapper} href={url}>
            <h2 className={Styles.title}>{title}</h2>
          </a>
          <i className={Styles.description}>{description}</i>
        </div>
        <a href={url}>
          {imgUrl && (
            <div className={Styles.imageContainer}>
              <img src={imgUrl} alt="Article" className={Styles.image} />
            </div>
          )}
        </a>
      </div>
      {blurb && (
        <div className={Styles.blurbContainer}>
          <span>
            <MarkdownView markdown={blurb} />
          </span>
        </div>
      )}
    </div>
  )
}

export default ReadingList
