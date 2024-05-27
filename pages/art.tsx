import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ArtGallery } from '../components/art/art-gallery/art-gallery'
import Layout from '../components/layout/layout'
import {
  ArtEntry,
  galleryEntries as galleryEntriesData,
  sketchbookEntries as sketchbookEntriesData,
} from '../lib/art/art'
import SharedStyles from '../styles/shared-styles.module.scss'
import { Tabs } from '../components/tabs/tabs'
import { Tab } from '../components/tabs/tab'

export interface ArtPageProps {
  galleryEntries: ArtEntry[]
  sketchbookEntries: ArtEntry[]
}

const ArtPage: React.FC<ArtPageProps> = ({ galleryEntries, sketchbookEntries }) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>I started drawing in 2023. Here is some of my work. Select an image for a better view.</p>

        <Tabs>
          <Tab title="Gallery" selected key="gallery_tab">
            <ArtGallery artEntries={galleryEntries} />
          </Tab>
          <Tab title="Sketchbook" key="sketchbook_tab">
            <ArtGallery artEntries={sketchbookEntries} />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default ArtPage

export const getStaticProps: GetStaticProps<ArtPageProps> = async () => ({
  props: {
    galleryEntries: galleryEntriesData,
    sketchbookEntries: sketchbookEntriesData,
  },
})
