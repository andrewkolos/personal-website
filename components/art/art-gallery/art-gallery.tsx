import LightGallery from 'lightgallery/react'
import Image from 'next/image'
import React from 'react'

import { ArtEntry } from '../../../lib/art'
import Styles from '../art-gallery.module.scss'

import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lightgallery.scss'

interface ArtGalleryProps {
  artEntries: ArtEntry[]
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({ artEntries }) => (
  <div className={Styles.galleryWrapper}>
    <LightGallery elementClassNames={Styles.gallery} backdropDuration={150} counter={false} download={false}>
      {artEntries.map((entry) => {
        let caption = `
          <div class='${Styles.title}'>${entry.title}. </div>
          <div>
          <span>${entry.media}. </span>
          <span class='${Styles.date}'>${new Date(entry.date).toLocaleDateString()}. </span>
          </div>
        `
        if (entry.reference != null) {
          caption += `
          <span>Reference: <a href='${entry.reference.url}' target='_blank' class=${Styles.reference}>${entry.reference.title}</a> by ${entry.reference.providerName}</span>
          `
        }
        return (
          <a
            href={`/art/${entry.imageFilename}`}
            key={entry.imageFilename}
            className={Styles.thumbnail}
            // https://www.lightgalleryjs.com/demos/captions/
            data-sub-html={caption}
          >
            <Image
              src={`/art/${entry.imageFilename}`}
              alt={entry.title}
              width={entry.width}
              height={entry.height}
              loading="lazy"
            />
          </a>
        )
      })}
    </LightGallery>
  </div>
)
