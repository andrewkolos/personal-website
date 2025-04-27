import LightGallery from 'lightgallery/react'
import Image from 'next/image'
import React from 'react'

import { ArtEntry } from '../../../lib/art/art'
import Styles from '../art-gallery.module.scss'

import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lightgallery.scss'

interface ArtGalleryProps {
  artEntries: ArtEntry[]
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({ artEntries }) => (
  <div className={Styles.galleryWrapper}>
    <LightGallery
      elementClassNames={Styles.gallery}
      backdropDuration={150}
      counter={false}
      download={false}
      subHtmlSelectorRelative
      mobileSettings={{
        showCloseIcon: true,
        controls: false,
      }}
    >
      {artEntries.map((entry) => (
        <a
          href={`/art/${entry.imageFilename}`}
          key={entry.imageFilename}
          className={Styles.thumbnail}
          data-sub-html=".caption"
          // https://www.lightgalleryjs.com/demos/captions/
        >
          <Image
            src={`/art/${entry.imageFilename}`}
            alt={entry.title}
            width={entry.width}
            height={entry.height}
            loading="lazy"
            style={{ objectPosition: `${entry.thumbPosition.width}% ${entry.thumbPosition.height}%` }}
          />

          <div style={{ display: 'none' }}>
            <div className="caption">
              <div className={Styles.title}>{entry.title} </div>
              <div>
                {entry.media.detailsString != null ? (
                  <span className={`${Styles.tooltip} ${Styles.tooltipTop}`}>
                    <span>{entry.media.shortString}</span>
                    <span className={Styles.tooltipText}>{entry.media.detailsString}</span>
                  </span>
                ) : (
                  <span>{entry.media.shortString}. </span>
                )}

                <span className={Styles.date}> {new Date(entry.date).toLocaleDateString()}. </span>
              </div>
              {entry.reference && (
                <span>
                  Reference:{' '}
                  <a href={entry.reference.url ?? undefined} target="_blank" rel="noreferrer" className={Styles.reference}>
                    {entry.reference.title}
                  </a>{' '}
                  by {entry.reference.providerName}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </LightGallery>
  </div>
)
