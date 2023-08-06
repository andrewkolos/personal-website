import { useRouter } from 'next/router'
import React from 'react'
import AboutMe from '../components/about-me/about-me'
import Layout from '../components/layout/layout'

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname}>
      <AboutMe />
    </Layout>
  )
}

export default IndexPage
