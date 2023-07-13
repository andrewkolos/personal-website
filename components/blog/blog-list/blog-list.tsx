import Link from 'next/link'
import React from 'react'
import { BlogPostData } from '../../../lib/posts/blog-post-data'
import SharedStyles from '../../../styles/shared-styles.module.scss'
import Styles from './blog-list.module.scss'

export interface BlogListProps {
  posts: BlogPostData[]
}

const BlogList: React.FunctionComponent<BlogListProps> = ({ posts }) => (
  <div className={SharedStyles.card}>
    <h1>Blog posts</h1>
    {posts
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .map((post) => (
        <div className={Styles.container} key={post.id}>
          <Link legacyBehavior href={`/posts/${post.id}`}>
            <a className={Styles.titleContainer}>
              <h2 className={Styles.title}>{post.title}</h2>
              <span className={Styles.subtitle}>{post.subtitle}</span>
            </a>
          </Link>
          <p className={Styles.excerpt}>{post.excerpt}&nbsp;</p>
          <p className={Styles.secondaryInfo}>{post.date}</p>
        </div>
      ))}
  </div>
)

export default BlogList
