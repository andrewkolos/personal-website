/* eslint-disable jsx-a11y/interactive-supports-focus */

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { ArtEntry } from '../../../lib/art'
import Styles from '../art-gallery.module.scss'

interface ArtGalleryProps {
  entry: ArtEntry
}

// Use same quality for all versions of same image to avoid loading what are
// all different instances of effectively the same image.
//
// 75 is the nextjs default.
const QUALITY = 50

export const ArtPiece: React.FC<ArtGalleryProps> = ({ entry }) => {
  const router = useRouter()
  const asPath = router.asPath.substring(0, router.asPath.indexOf('#'))
  let closeButton: HTMLAnchorElement | undefined

  const [lightboxVisible, setLightboxVisible] = useState(false)

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeButton!.click()
      }
    }

    window.addEventListener('keyup', listener)

    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [])

  // Handles case where use deliberately modifies the target hash.
  useEffect(() => {
    const listener = () => {
      updateLightboxVisibility()
    }

    window.addEventListener('hashchange', listener)

    return () => {
      window.removeEventListener('hashchange', listener)
    }
  }, [])

  // Handles direct navigation case (e.g. /art#Pear%20from%20Photo%20Reference)
  useEffect(() => {
    updateLightboxVisibility()
  })

  function onLightBoxClicked(e: React.MouseEvent<HTMLDivElement>) {
    if (!(e.target instanceof HTMLAnchorElement)) {
      closeButton!.click() // AppRouterInstance.replace doesn't work properly with css :target for some reason.
    }
  }

  function updateLightboxVisibility() {
    const target = window.location.href.toString().substring(window.location.href.toString().indexOf('#') + 1)
    setLightboxVisible(target === encodeURIComponent(entry.title))
  }

  return (
    <>
      <div className={Styles.thumbnail}>
        <a target="_self" href={`${asPath}#${entry.title}`} onClick={() => setLightboxVisible(true)}>
          <Image
            src={`/art/${entry.imageFilename}`}
            alt={entry.title}
            width={3907}
            height={3072}
            fetchPriority="high"
            quality={QUALITY}
          />
        </a>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div id={entry.title} className={calcStyles()} onClick={onLightBoxClicked} role="button">
        <a
          ref={(e) => {
            closeButton = e!
          }}
          className={Styles.close}
          onClick={() => setLightboxVisible(false)}
          href={`${asPath.substring(0, asPath.indexOf('#'))}#`}
        >
          X
        </a>
        <div className={Styles.content}>
          <Image
            src={`/art/${entry.imageFilename}`}
            alt={entry.title}
            width={entry.width}
            height={entry.height}
            quality={QUALITY}
          />
          <div className={Styles.content}>
            <em className={Styles.title}>{entry.title}. </em>
            <em>{entry.media}. </em>
            <span className={Styles.date}>{new Date(entry.date).toLocaleDateString()}. </span>
            <a className={Styles.light} href={`/art/${entry.imageFilename}`} target="_blank" rel="noreferrer">
              {' '}
              Original image <FaExternalLinkAlt />{' '}
            </a>
          </div>
        </div>
      </div>
    </>
  )

  function calcStyles(): string | undefined {
    const result = [Styles.lightbox]
    if (lightboxVisible) {
      result.push(Styles.targeted)
    }
    return result.join(' ')
  }
}
