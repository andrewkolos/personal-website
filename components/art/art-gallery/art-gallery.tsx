import React from 'react'
import Image from 'next/image'
import LightGallery from 'lightgallery/react'
import { ArtEntry } from '../../../lib/art'
import Styles from '../art-gallery.module.scss'

import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lightgallery.scss'

interface ArtGalleryProps {
  artEntries: ArtEntry[]
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({ artEntries }) => (
  <div className={Styles.galleryWrapper}>
    <LightGallery elementClassNames={Styles.gallery} backdropDuration={150} counter={false}>
      {artEntries.map((entry) => (
        <a
          href={`/art/${entry.imageFilename}`}
          key={entry.imageFilename}
          className={Styles.thumbnail}
          // https://www.lightgalleryjs.com/demos/captions/
          data-sub-html={`
            <em class='${Styles.title}>'>${entry.title}. </em>
            <em>${entry.media}. </em>
            <span class='${Styles.date}'>${new Date(entry.date).toLocaleDateString()}. </span>
          `}
        >
          <Image
            src={`/art/${entry.imageFilename}`}
            alt={entry.title}
            width={entry.width}
            height={entry.height}
            loading="lazy"
          />
        </a>
      ))}
    </LightGallery>
  </div>
)
