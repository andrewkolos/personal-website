import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Layout from '../components/layout/layout'
import { ArtEntry, artEntries } from '../lib/art'
import SharedStyles from '../styles/shared-styles.module.scss'
import { ArtGallery } from '../components/art/art-gallery/art-gallery'
import { Tabs } from '../components/tabs/tabs'
import { Tab } from '../components/tabs/tab'

export interface ArtPageProps {
  entries: ArtEntry[]
}

const ReadingList: React.FC<ArtPageProps> = ({ entries }) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>I started drawing in 2023. Here is some of my work. Select an image for a better view.</p>

        <Tabs>
          <Tab title="Gallery" selected urlSlug="gallery" key="gallery_tab">
            <ArtGallery artEntries={entries} />
          </Tab>
          <Tab title="Scribbles" selected={false} urlSlug="scribbles" key="scribbles_tab">
            Under construction
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default ReadingList

export const getStaticProps: GetStaticProps<ArtPageProps> = async () => ({
  props: {
    entries: artEntries,
  },
})
