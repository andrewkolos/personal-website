import { graphql } from 'gatsby'
import React from "react"
import Layout from "../components/layout"

const IndexPage = ({data}: { data: any }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({node}: {node: any}) => (
      <div key={node.id}>
        <h3>{node.frontmatter.title}</h3>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export const query = graphql`
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
`;

export default IndexPage;
