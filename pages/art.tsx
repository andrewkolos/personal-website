import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ArtGallery } from '../components/art/art-gallery/art-gallery'
import Layout from '../components/layout/layout'
import { ArtEntry, galleryEntries as galleryEntriesData } from '../lib/art'
import SharedStyles from '../styles/shared-styles.module.scss'

export interface ArtPageProps {
  galleryEntries: ArtEntry[]
}

const ArtPage: React.FC<ArtPageProps> = ({ galleryEntries }) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>I started drawing in 2023. Here is some of my work. Select an image for a better view.</p>

        <ArtGallery artEntries={galleryEntries} />
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
