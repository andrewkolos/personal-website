import { graphql, StaticQuery } from 'gatsby'
import React from "react"
import Styles from './blog-listing.module.scss';

const BlogListing = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
              }
              excerpt
            }
          }
        }
      }
    `}

    render={data => (
      data.allMarkdownRemark.edges.map(({ node }: { node: any }) => (
        <div className={Styles.container} key={node.id}>
          <h3 className={Styles.title}>{node.frontmatter.title}{" "}</h3>
          <span className={Styles.secondaryInfo}> — {node.frontmatter.date}</span>
          <p className={Styles.excerpt}>{node.excerpt}</p>
        </div>
      ))
    )}

  />);

export default BlogListing;
