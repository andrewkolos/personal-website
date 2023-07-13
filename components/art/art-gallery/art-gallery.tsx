import React from 'react'
import { ArtEntry } from '../../../lib/art'
import Styles from '../art-gallery.module.scss'
import { ArtPiece } from '../art-piece/art-piece'

interface ArtGalleryProps {
  artEntries: ArtEntry[]
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({ artEntries }) => (
  <div className={Styles.galleryWrapper}>
    <div className={Styles.gallery}>
      {artEntries.map((entry) => (
        <ArtPiece key={entry.title} entry={entry} />
      ))}
    </div>
  </div>
)
