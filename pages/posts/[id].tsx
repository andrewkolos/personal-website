import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { BlogPostData } from '../../lib/posts/blog-post-data'
import { getAllPostsFileIds } from '../../lib/posts/get-all-posts-file-ids'
import { getPostData } from '../../lib/posts/get-post-data'
import { CodeBlock } from '../../components/blog/code-block/code-block'
import Seo from '../../components/seo'
import Layout from '../../components/layout/layout'
import Styles from './blog-page.module.scss'
import { getParamsFromStaticPropsContext } from '../../lib/get-params-from-static-props-context'

const components = {
  pre: CodeBlock,
}

export interface BlogPostProps extends BlogPostData {}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const router = useRouter()
  const { title, subtitle, excerpt, tags, date, compiledSource } = props

  return (
    <Layout pathName={router.pathname}>
      <Seo title={`${title} | Andrew Kolos`} description={excerpt} keywords={tags} />
      <div className={Styles.blogPostContainer}>
        <div className={Styles.blogPost}>
          <h1 className={Styles.title}>{title}</h1>
          {subtitle && <span className={Styles.subtitle}>{subtitle}</span>}
          <div className={Styles.date}>{date}</div>
          <div className={Styles.blogPostContent}>
            <MDXRemote compiledSource={compiledSource} components={components as any} />{' '}
            {/* Not sure why type assertion is needed here. */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface PathParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<PathParams> = () => {
  const paths = getAllPostsFileIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps, PathParams> = async (context) => {
  const params = getParamsFromStaticPropsContext(context)
  const postData = await getPostData(params.id)

  return {
    props: { ...postData },
  }
}

export default BlogPost
