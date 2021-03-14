import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import Styles from "./blog-list.module.scss";
import SharedStyles from "../../../shared-styles.module.scss";

const BlogList: React.FunctionComponent<unknown> = () => {
  const data = useStaticQuery(graphql`
    query {
    allMdx {
      edges {
        node {
          frontmatter {
            title
            slug
            subtitle
            date
          }
          excerpt(pruneLength: 280)
        }
      }
    }
  }
  `)

  return (
    <div className={SharedStyles.card}>
      <h1>Blog posts</h1>
      {data.allMdx.edges
        .sort((a: any, b: any) => Date.parse(b.node.frontmatter.date) - Date.parse(a.node.frontmatter.date))
        .map(({ node }: { node: any }) => (
          <div className={Styles.container} key={node.id}>
            <Link className={Styles.titleContainer} to={node.frontmatter.slug}>
              <h2 className={Styles.title}>{node.frontmatter.title}</h2>
              <span className={Styles.subtitle}>{node.frontmatter.subtitle}</span>
            </Link>
            <p className={Styles.excerpt}>
              {node.excerpt}&nbsp;
          </p>
            <p className={Styles.secondaryInfo}>{node.frontmatter.date}</p>
          </div>
        ))}
    </div>
  )
}

export default BlogList
