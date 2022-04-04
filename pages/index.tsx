import { useRouter } from 'next/router'
import React from 'react'
import { GetStaticProps } from 'next'
import { BlogPostData } from '../lib/posts/blog-post-data'
import { getSortedPostsData } from '../lib/posts/get-sorted-posts-data'
import AboutMe from '../components/about-me/about-me'
import BlogList from '../components/blog/blog-list/blog-list'
import Layout from '../components/layout/layout'
// import { getRecentlyPlayedGamesData } from '../lib/games/get-recently-played-games-data'
// import { GameData } from '../lib/games/game-data'

interface IndexPageProps {
  allPostsData: BlogPostData[]
  // games: GameData[]
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const router = useRouter()
  const { allPostsData } = props
  return (
    <Layout pathName={router.pathname}>
      <AboutMe />
      <BlogList posts={allPostsData} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    allPostsData: await getSortedPostsData(),
  },
})

export default IndexPage
