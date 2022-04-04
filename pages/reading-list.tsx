import React from 'react'
import { objectPromiseAll } from '@akolos/object-promise-all'
import { getLinkPreview } from 'link-preview-js'
import { useRouter } from 'next/router'
import { ReadingListEntry } from '../components/reading-list-page/reading-list-entry'
import ReadingListComponent from '../components/reading-list-page/reading-list/reading-list'
import rawReadingListData from '../lib/readinglist'
import Layout from '../components/layout/layout'

export interface ReadingListProps {
  entries: ReadingListEntry[]
}

const ReadingList: React.FC<ReadingListProps> = ({ entries }) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname}>
      <ReadingListComponent entries={entries} />
    </Layout>
  )
}

export default ReadingList

export async function getStaticProps() {
  const readingListDataWithLinkPreviewInfo = await objectPromiseAll(
    rawReadingListData.map((d) => ({
      title: d.title,
      linkPreviewInfo: getLinkPreview(d.url, { timeout: 1000 * 30 }),
      date: new Date(d.date).toString(),
      blurb: d.blurb,
    })),
  )

  const entries: ReadingListEntry[] = readingListDataWithLinkPreviewInfo.map((d) => {
    const linkPreviewInfo = d.linkPreviewInfo as UnionToIntersection<typeof d.linkPreviewInfo> // Need this assertion because the library has awkward non-discriminated union typings.
    return {
      title: d.title,
      blurb: undefToNull(d.blurb),
      date: d.date,
      description: undefToNull(linkPreviewInfo.description),
      url: linkPreviewInfo.url,
      imgUrl: undefToNull(linkPreviewInfo.images ? linkPreviewInfo.images[0] : undefined),
    }
  })

  return {
    props: {
      entries,
    },
  }
}

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

function undefToNull<T>(value: T): T | null {
  return value === undefined ? null : value
}
