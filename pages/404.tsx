import { useRouter } from 'next/router'
import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout/layout'

const NotFoundPage: React.FC = () => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname}>
      <Seo title="404: Not found" />
      <h1>Page not found ):</h1>
    </Layout>
  )
}

export default NotFoundPage
