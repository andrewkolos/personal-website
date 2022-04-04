import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiGithub } from 'react-icons/fi'
import Styles from './demo-listing.module.scss'

export interface DemoListingProps {
  name: string
  description: string
  thumbnail: StaticImageData
  demoUrl: string
  repoUrl: string
  urlName?: string
}

const DemoListing: React.FunctionComponent<DemoListingProps> = ({
  thumbnail,
  name,
  urlName,
  demoUrl,
  repoUrl,
  description,
}) => {
  const img = (
    <div className={Styles.demoThumbnailContainer}>
      <Image width={423} height={237} src={thumbnail} alt={`${name} Demo`} className={Styles.demoThumbnail} />
    </div>
  )

  return (
    <div className={Styles.container} key={name}>
      {urlName && (
        <Link href={`demos/${urlName}`}>
          <a>{img}</a>
        </Link>
      )}
      {!urlName && <a href={demoUrl}>{img}</a>}
      <div className={Styles.textContent}>
        <Link href={urlName || demoUrl}>
          <a className={Styles.titleContainer}>
            <h2 className={Styles.title}>{name}</h2>
          </a>
        </Link>
        <p className={Styles.excerpt}>{description}&nbsp;</p>
        <a href={repoUrl}>
          <FiGithub className={Styles.gitHubIcon} size="14" />
          GitHub
        </a>
      </div>
    </div>
  )
}

DemoListing.defaultProps = {
  urlName: undefined,
}

export default DemoListing
