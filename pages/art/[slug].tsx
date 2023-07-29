import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/layout/layout'
import {
  ArtEntry,
  galleryEntries as galleryEntriesData,
  sketchbookEntries as sketchbookEntriesData,
} from '../../lib/art'
import SharedStyles from '../../styles/shared-styles.module.scss'
import { ArtGallery } from '../../components/art/art-gallery/art-gallery'
import { Tabs } from '../../components/tabs/tabs'
import { Tab } from '../../components/tabs/tab'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    {
      params: {
        slug: 'gallery',
      },
    },
    {
      params: {
        slug: 'sketchbook',
      },
    },
  ],
  fallback: true, // false or "blocking"
})

export interface ArtPageProps {
  galleryEntries: ArtEntry[]
  sketchbookEntries: ArtEntry[]
  slug: string
}

const ArtPage: React.FC<ArtPageProps> = ({ galleryEntries, sketchbookEntries, slug }) => {
  const router = useRouter()
  const parentSlug = (() => {
    const path = router.asPath
    const idxSlug = path.indexOf(`/${slug}`)
    return path.substring(0, idxSlug)
  })()

  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>I started drawing in 2023. Here is some of my work. Select an image for a better view.</p>

        <Tabs parentSlug={parentSlug} activeSlug={slug}>
          <Tab title="Gallery" selected urlSlug="gallery" key="gallery_tab">
            <ArtGallery artEntries={galleryEntries} />
          </Tab>
          <Tab title="Sketchbook" urlSlug="sketchbook" key="sketchbook_tab">
            <ArtGallery artEntries={sketchbookEntries} />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default ArtPage

export const getStaticProps: GetStaticProps<ArtPageProps> = async ({ params }) => {
  let slug = params?.slug
  if (typeof slug !== 'string') {
    slug = 'gallery'
  }
  return {
    props: {
      galleryEntries: galleryEntriesData,
      sketchbookEntries: sketchbookEntriesData,
      slug,
    },
  }
}
