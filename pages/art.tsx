import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Layout from '../components/layout/layout'
import { ArtEntry, artEntries } from '../lib/art'
import SharedStyles from '../styles/shared-styles.module.scss'
import { ArtGallery } from '../components/art/art-gallery/art-gallery'

export interface ArtPageProps {
  entries: ArtEntry[]
}

const ReadingList: React.FC<ArtPageProps> = ({ entries }) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname} noSideMargins>
      <div className={SharedStyles.card}>
        <h1>Art</h1>
        <p>I started to learn to draw in 2023. This page shows some things I have made.</p>

        <ArtGallery artEntries={entries} />
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
