import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../layout/layout';
import Styles from './blog-template.module.scss';

const BlogTemplate: React.FunctionComponent<any> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
    <div className={Styles.blogPostContainer}>
      <div className={Styles.blogPost}>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className={Styles.blogPostContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    </Layout>
  );
}

export const mdPageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export default BlogTemplate;