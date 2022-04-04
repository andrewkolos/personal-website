import { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { embeddedDemos, nonInteractiveDemos } from '../lib/demos'
import { allDemoImageData } from '../lib/demos/all-demo-image-data'
import DemoList from '../components/demo/demo-list/demo-list'
import { DemoListingProps } from '../components/demo/demo-listing/demo-listing'
import Seo from '../components/seo'
import Layout from '../components/layout/layout'
import SharedStyles from '../styles/shared-styles.module.scss'

const DemosPage: React.FC = () => {
  const router = useRouter()

  const imagesByName = new Map<string, StaticImageData>(
    allDemoImageData.map((image) => {
      const fileName = (() => {
        const fileNameWithExtAndUrlParams = image.src.split('/').pop()
        if (fileNameWithExtAndUrlParams == null) {
          throw Error('Image source was empty.')
        }
        return fileNameWithExtAndUrlParams.split('.')[0]
      })()

      return [fileName, image]
    }),
  )

  const embeddedDemoListings: DemoListingProps[] = embeddedDemos.map((d) => {
    const thumbnail = getThumbnailObject(imagesByName, d.id)
    return {
      demoUrl: d.demoUrl,
      name: d.name,
      repoUrl: d.repoUrl,
      description: d.description,
      thumbnail,
      urlName: d.urlName,
    }
  })

  useEffect(() => {
    embeddedDemoListings.forEach((edl) => {
      fetch(edl.demoUrl, {
        mode: 'no-cors',
      }) // Hack to rehydrate any Heroku servers.
    })
  }, [])

  const nonInteractiveDemoListings: DemoListingProps[] = nonInteractiveDemos.map((d) => {
    const thumbnail = getThumbnailObject(imagesByName, d.id)
    return {
      demoUrl: d.demoUrl,
      name: d.name,
      repoUrl: d.repoUrl,
      description: d.description,
      thumbnail,
    }
  })

  return (
    <Layout pathName={router.pathname}>
      <Seo description="Games and demos made by Andrew Kolos." keywords={['games', 'demos', 'portfolio']} />
      <div className={SharedStyles.card}>
        <h1>Games and demos</h1>
        Some games and other demos of things that I&#39;ve made for fun that are still working.
        <DemoList demoInfo={embeddedDemoListings} />
      </div>
      <div className={SharedStyles.card}>
        <h1>Non-interactive demos</h1>
        Some other stuff I have that can be shown off with pictures.
        <DemoList demoInfo={nonInteractiveDemoListings} />
      </div>
    </Layout>
  )
}

export default DemosPage

function getThumbnailObject(imagesByName: Map<string, StaticImageData>, thumbnailName: string) {
  const thumbnail = imagesByName.get(thumbnailName)
  if (thumbnail == null) {
    throw Error(`No thumbnail found for demo: ${thumbnailName}`)
  }
  return thumbnail
}
