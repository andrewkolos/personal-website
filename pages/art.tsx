/* eslint-disable spaced-comment */
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ArtGallery } from '../components/art/art-gallery/art-gallery'
import Layout from '../components/layout/layout'
import {
  ArtEntry,
  ArtEntryType,
  galleryEntries as galleryEntriesData,
} from '../lib/art/art'
import SharedStyles from '../styles/shared-styles.module.scss'
import { Tabs } from '../components/tabs/tabs'
import { Tab } from '../components/tabs/tab'
import Styles from './art.module.scss'

export interface ArtPageProps {
  galleryEntries: ArtEntry[]
}

const ArtPage: React.FC<ArtPageProps> = ({ galleryEntries}) => {
  const router = useRouter()
  const [showSketches, setShowSketches] = useState(true)

  const filteredEntries = galleryEntries.filter((e) => {
    switch (e.type) {
      case ArtEntryType.Normal:
        return true;
      case ArtEntryType.Sketch:
        return showSketches;
      default:
        throw Error('Unimplemented');
    }
  }).sort((a, b) => {
    const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return (a.page ?? 1) - (b.page ?? 1)
}).reverse()

  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>
          I took up drawing as a second hobby in mid-2023. I&apos;ve come to
          enjoy watercolor in particular for the quick thinking and
          improvization that a rapidly-drying, highly-fluid, and transparent
          medium requires.
        </p>

        <p>Here is some of my work. Select an image for a better view.</p>

        <div className={Styles.filterControlsOutter}>
          <div className={Styles.filterControlsInner}>
            <label htmlFor="showSketchesCheckbox">
              <input
                id="showSketchesCheckbox"
                type="checkbox"
                checked={showSketches}
                onChange={(e) => setShowSketches(e.target.checked)}
              />
              &nbsp; Show sketches
            </label>
          </div>
        </div>


        <Tabs>
          <Tab title="Gallery" selected key="gallery_tab">
            <ArtGallery artEntries={filteredEntries} />
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
  },
})
