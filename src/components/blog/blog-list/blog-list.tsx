import { graphql, Link, useStaticQuery } from 'gatsby';
import React from "react";
import Styles from './blog-list.module.scss';
import SharedStyles from '../../../shared-styles.module.scss';

const BlogList: React.FunctionComponent<{}> = () => {
  const data = useStaticQuery(graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                slug
              }
              excerpt(pruneLength: 280)
            }
          }
        }
      }
    `);

  return (
    <div className={SharedStyles.card}>
      <h2>Blog posts</h2>
      {data.allMarkdownRemark.edges.map(({ node }: { node: any }) => (
        <div className={Styles.container} key={node.id}>
          <Link className={Styles.titleLink} href={node.frontmatter.slug}><h2 className={Styles.title}>{node.frontmatter.title}</h2></Link>
          <p className={Styles.excerpt}>{node.excerpt}</p>
          <p className={Styles.secondaryInfo}>{node.frontmatter.date}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
