import { graphql, Link, useStaticQuery } from 'gatsby';
import React from "react";
import Styles from './blog-listing.module.scss';
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
                subtitle
                date(formatString: "DD MMMM, YYYY")
                slug
              }
              excerpt(pruneLength: 280)
            }
          }
        }
      }
    `);

  console.log('sharedStyles', SharedStyles);

  return (
    <div className={SharedStyles.outerCard}>
      {data.allMarkdownRemark.edges.map(({ node }: { node: any }) => (
        <div className={Styles.container} key={node.id}>
          <Link className={Styles.titleLink} href={node.frontmatter.slug}><h2 className={Styles.title}>{node.frontmatter.title}</h2></Link>
          <h4 className={Styles.subtitle}>{node.frontmatter.subtitle}</h4>
          <p className={Styles.excerpt}>{node.excerpt}</p>
          <p className={Styles.secondaryInfo}>{node.frontmatter.date}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
