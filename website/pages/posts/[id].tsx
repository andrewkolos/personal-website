import dedent from 'dedent'
import { DiscussionEmbed } from 'disqus-react'
import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { BlogPostData } from '../../lib/posts/blog-post-data'
import { getAllPostsFileIds } from '../../lib/posts/get-all-posts-file-ids'
import { getPostData } from '../../lib/posts/get-post-data'
import { Aside } from '../../components/blog/aside/aside'
import { CodeBlock } from '../../components/blog/code-block/code-block'
import Seo from '../../components/seo'
import Layout from '../../components/layout/layout'
import Styles from './blog-page.module.scss'
import { getParamsFromStaticPropsContext } from '../../lib/get-params-from-static-props-context'

const components = {
  pre: CodeBlock,
  aside: Aside,
}

export interface BlogPostProps extends BlogPostData {
  disqusShortname: string
}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const router = useRouter()
  const { title, subtitle, excerpt, tags, id, date, compiledSource, disqusShortname } = props

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
          <DiscussionEmbed shortname={disqusShortname} config={{ identifier: id, title }} />
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
  const disqusShortname = process.env.GATSBY_DISQUS_NAME

  if (!disqusShortname) {
    throw Error(dedent`Disqus name was empty/undefined. Retrieve it from the
      Disqus web console and provide it in the GATSBY_DISQUS_NAME env variable.`)
  }

  const params = getParamsFromStaticPropsContext(context)
  const postData = await getPostData(params.id)

  if (postData == null) {
    throw Error()
  }

  return {
    props: { disqusShortname, ...postData },
  }
}

export default BlogPost
