import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaExternalLinkAlt } from 'react-icons/fa'
import { Demo } from '../../../lib/demos'
import Styles from './demo-listing.module.scss'

export interface DemoListingProps {
  demoInfo: Demo
  thumbnail: StaticImageData
}

const DemoListing: React.FunctionComponent<DemoListingProps> = ({ thumbnail, demoInfo }) => {
  const { name, demoUrl, repoUrl, description } = demoInfo

  const img = (
    <div className={Styles.demoThumbnailContainer}>
      <Image width={423} height={237} src={thumbnail} alt={`${name} Demo`} className={Styles.demoThumbnail} />
    </div>
  )

  return (
    <div className={Styles.container} key={name}>
      {demoInfo.kind === 'interactive' && (
        <Link href={`demos/${demoInfo.urlName}`}>
          <a>{img}</a>
        </Link>
      )}
      {demoInfo.kind === 'non-interactive' && <a href={demoUrl}>{img}</a>}
      <div className={Styles.textContent}>
        <Link href={demoInfo.kind === 'interactive' ? `demos/${demoInfo.urlName}` : repoUrl}>
          <a className={Styles.titleContainer} target="blank">
            <h2 className={Styles.title}>
              {name} {demoInfo.kind === 'non-interactive' && <FaExternalLinkAlt />}
            </h2>
          </a>
        </Link>
        <p className={Styles.excerpt}>{description}&nbsp;</p>
        <a href={repoUrl} target="blank">
          GitHub
          <FaExternalLinkAlt style={{ marginLeft: '4px' }} size="14" />
        </a>
      </div>
    </div>
  )
}

export default DemoListing
